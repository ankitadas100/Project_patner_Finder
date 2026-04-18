import express from 'express';
import fetchuer from '../middlewares/fecthuser.js';
import RequirmentHackthon from '../models/RequirmentHackthon.js';
import User from '../models/User.js';
import RequirmentProject from '../models/RequirmentProject.js';

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


export default requirmentWorkRouter;