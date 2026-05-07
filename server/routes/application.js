import express from 'express';
import fetchuer from '../middlewares/fecthuser.js';
import userApplication from '../models/Application.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import RequirmentHackthon from '../models/RequirmentHackthon.js';
import RequirmentProject from '../models/RequirmentProject.js';
import sendAcceptanceEmail from '../middlewares/sendAcceptMail.js';
import sendRejectionEmail from '../middlewares/sendRejactmail.js';

const applicationRouter = express.Router();

applicationRouter.post('/hackthon-application', fetchuer, async (req, res) => {
    try {
        const { eventId } = req.body;
        const email = req.email;
        const finduser = await User.findOne({ email: email }).select("-password")
        const newApllication = new userApplication({
            applicantId: finduser._id,
            eventId,
            eventModel: 'RequirmentHackthon',
        })
        newApllication.save();
        return res.status(201).json({ "msg": "Application submited.", status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "msg": "Internal Servre errror", status: false })
    }
})
applicationRouter.post('/project-application', fetchuer, async (req, res) => {
    try {
        const { eventId } = req.body;
        const email = req.email;
        const finduser = await User.findOne({ email: email }).select("-password")
        const newApllication = new userApplication({
            applicantId: finduser._id,
            eventId,
            eventModel: 'RequirmentProject',
        })
        newApllication.save();
        return res.status(201).json({ "msg": "Application submited.", status: true })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "msg": "Internal Servre errror", status: false })
    }
})
applicationRouter.get("/isApply/:id", fetchuer, async (req, res) => {
    try {
        const email = req.email;
        const finduser = await User.findOne({ email: email }).select("-password")
        console.log(req.params.id, finduser._id)

        const finAppplication = await userApplication.find({
            applicantId: finduser._id,
            eventId: new mongoose.Types.ObjectId(req.params.id)
        });
        console.log(finAppplication)
        if (finAppplication.length == 0) {
            return res.status(404).json({ "msg": "Not applied", status: false })
        }
        return res.status(200).json({ "msg": "Found", status: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ "msg": "Internal Servre errror", status: false })
    }
});
applicationRouter.get('/user-all-application', fetchuer, async (req, res) => {
    try {
        const email = req.email;
        const finduser = await User.findOne({ email: email }).select("-password")
        const applications = await userApplication.aggregate([
            {
                $match: {
                    applicantId: finduser._id
                }
            },

            // Lookup for Hackathon
            {
                $lookup: {
                    from: 'requirmenthackthons', // collection name (lowercase + plural)
                    localField: 'eventId',
                    foreignField: '_id',
                    as: 'hackthonDetails'
                }
            },

            // Lookup for Project
            {
                $lookup: {
                    from: 'requirmentprojects',
                    localField: 'eventId',
                    foreignField: '_id',
                    as: 'projectDetails'
                }
            },

            // Add correct eventDetails based on eventModel
            {
                $addFields: {
                    eventDetails: {
                        $cond: {
                            if: { $eq: ['$eventModel', 'RequirmentHackthon'] },
                            then: { $arrayElemAt: ['$hackthonDetails', 0] },
                            else: { $arrayElemAt: ['$projectDetails', 0] }
                        }
                    }
                }
            },

            // Optional: clean response
            {
                $project: {
                    hackthonDetails: 0,
                    projectDetails: 0
                }
            }
        ]);
        console.log(applications)
        res.json({ success: true, data: applications });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


applicationRouter.get('/user-hackthon-posts-with-applicants', fetchuer, async (req, res) => {
    try {
        const email = req.email;
        const finduser = await User.findOne({ email: email }).select("-password")
        const userId = finduser._id
        const hackathons = await RequirmentHackthon.aggregate([
            { $match: { user: userId } },
            {
                $lookup: {
                    from: 'userapplications',
                    localField: '_id',
                    foreignField: 'eventId',
                    as: 'applications',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'applicantId',
                                foreignField: '_id',
                                as: 'applicant'
                            }
                        },
                        { $unwind: '$applicant' },
                        {
                            $project: {
                                status: 1,
                                createdAt: 1,
                                applicant: {
                                    _id: 1,
                                    name: 1,
                                    email: 1
                                }
                            }
                        }
                    ]
                }
            },
            { $addFields: { type: 'hackathon' } }
        ]);
        res.json({ success: true, data: hackathons });

    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});
applicationRouter.get('/user-project-posts-with-applicants', fetchuer, async (req, res) => {
    try {
        const email = req.email;
        const finduser = await User.findOne({ email: email }).select("-password")
        const userId = finduser._id
        const projects = await RequirmentProject.aggregate([
            { $match: { user: userId } },
            {
                $lookup: {
                    from: 'userapplications',
                    localField: '_id',
                    foreignField: 'eventId',
                    as: 'applications',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'applicantId',
                                foreignField: '_id',
                                as: 'applicant'
                            }
                        },
                        { $unwind: '$applicant' },
                        {
                            $project: {
                                status: 1,
                                createdAt: 1,
                                applicant: {
                                    _id: 1,
                                    name: 1,
                                    email: 1
                                }
                            }
                        }
                    ]
                }
            },
            { $addFields: { type: 'project' } }
        ]);


        res.json({ success: true, data: projects });

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });
    }
});

applicationRouter.put('/accept-application/:id', fetchuer, async (req, res) => {
    try {
        const {eventName,email}=req.body;
        const isValidId = await userApplication.findById(req.params.id);
        const updateData = {
            status: 'accepted'
        }
        if (isValidId.length == 0) {
            return res.status(404).json({ "msg": "Not found", status: false })
        }
        const update = await userApplication.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true })
        const sendmail= await sendAcceptanceEmail(email,eventName)
        return res.status(202).json({ "msg": "Accepted", status: true })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });

    }


});
applicationRouter.put('/reject-application/:id', fetchuer, async (req, res) => {
    try {
        const isValidId = await userApplication.findById(req.params.id);
        const {eventName,email}=req.body;
        const updateData = {
            status: 'rejected'
        }
        if (isValidId.length == 0) {
            return res.status(404).json({ "msg": "Not found", status: false })
        }
        const update = await userApplication.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true })
        const sendmail = await sendRejectionEmail(email,eventName)
        return res.status(202).json({ "msg": "rejected", status: true })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: err.message });

    }
});
export default applicationRouter;


