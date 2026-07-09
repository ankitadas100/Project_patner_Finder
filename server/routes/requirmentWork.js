import express from 'express';
import fetchuer from '../middlewares/fecthuser.js';
import RequirmentHackthon from '../models/RequirmentHackthon.js';
import User from '../models/User.js';
import RequirmentProject from '../models/RequirmentProject.js';
import userApplication from '../models/Application.js';

const requirmentWorkRouter = express.Router();

requirmentWorkRouter.post("/add-hackthon-reqirment", fetchuer, async (req, res) => {
    try {
        const { hackthonName, hackthonProblemCategory, hackthonProblemStatement, hackthonProjectIdea, hackthonWebsiteLink, AllTechStack, RequiredSkills } = req.body;
        const email = req.email;
        const finduser = await User.findOne({ email: email }).select("-password")
        const newRequirmentofHackthon = new RequirmentHackthon({
            user: finduser._id,
            hackthonName: hackthonName,
            hackthonProblemCategory: hackthonProblemCategory,
            hackthonProblemStatement: hackthonProblemStatement,
            hackthonProjectIdea: hackthonProjectIdea,
            hackthonWebsiteLink: hackthonWebsiteLink,
            AllTechStack: AllTechStack,
            RequiredSkills: RequiredSkills
        })
        await newRequirmentofHackthon.save();
        return res.status(200).json({ "msg": "Adding is done", status: true })
    } catch (error) {

        console.log(error)
        return res.status(500).json({ "msg": "Internal Servre errror", status: false })
    }
});
requirmentWorkRouter.post("/add-project-requirment", fetchuer, async (req, res) => {
    try {
        const { ProjectTitle, ProjectDescription, ProjectType, ProjectStatus, AllTechStack, RequiredSkills, ProjectRepoLink } = req.body;
        const email = req.email;
        const finduser = await User.findOne({ email: email }).select("-password")
        const newRequirmentofProject = new RequirmentProject({
            user: finduser._id,
            ProjectTitle: ProjectTitle,
            ProjectDescription: ProjectDescription,
            ProjectType: ProjectType,
            ProjectStatus: ProjectStatus,
            AllTechStack: AllTechStack,
            RequiredSkills: RequiredSkills,
            ProjectRepoLink: ProjectRepoLink,
        });
        await newRequirmentofProject.save();
        return res.status(200).json({ "msg": "Adding is done", status: true })
    } catch (error) {

        console.log(error)
        return res.status(500).json({ "msg": "Internal Servre errror", status: false })
    }

})

requirmentWorkRouter.get("/all-hackthon-requirment", async (req, res) => {
    try {

        const allhackthondata = await RequirmentHackthon.find({});
        return res.status(200).json({ "data": allhackthondata, status: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ "msg": "Internal Servre errror", status: false })
    }

})

requirmentWorkRouter.get("/all-project-requirment", async (req, res) => {
    try {

        const allProjectdata = await RequirmentProject.find({});
        return res.status(200).json({ "data": allProjectdata, status: true })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ "msg": "Internal Server error", status: false })
    }

})

requirmentWorkRouter.delete('/delete-project/:id', fetchuer, async (req, res) => {
    try {

        // Find project
        const project = await RequirmentProject.findById(req.params.id);

        // Check project exists
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }


        // Delete all related applications
        await userApplication.deleteMany({
            eventId: req.params.id,
            eventModel: 'RequirmentProject'
        });

        // Delete project
        await RequirmentProject.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Project and related applications deleted successfully'
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});

requirmentWorkRouter.delete('/delete-hackthon/:id', fetchuer, async (req, res) => {
    try {

        // Find project
        const project = await RequirmentHackthon.findById(req.params.id);

        // Check project exists
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        // Delete all related applications
        await userApplication.deleteMany({
            eventId: req.params.id,
            eventModel: 'RequirmentProject'
        });

        // Delete project
        await RequirmentHackthon.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Hackthon and related applications deleted successfully'
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }
});

export default requirmentWorkRouter;