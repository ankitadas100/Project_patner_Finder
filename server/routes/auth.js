import express from "express"
import sendemail from "../middlewares/sendemail.js";
import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import fetchuer from "../middlewares/fecthuser.js";
import cloudinary from "../config/cloudinary.js";
import upload from "../middlewares/upload.js";
import fs from "fs"
const authRouter = express.Router();

let otp = null;


authRouter.post("/sendemail", async (req, res) => {
    try {
        const { email } = req.body;
        const IstUserHaveAccount = await User.findOne({ email });
        console.log(IstUserHaveAccount);
        if (IstUserHaveAccount) {
            return res.status(400).json({ "message": "Already have an account.", status: false })
        }
        otp = Math.floor((Math.random() * 1000000) + 1);
        console.log(otp)
        const sendmail = await sendemail(email, otp);
        console.log("✅ Email Response:", sendmail);

        return res.status(200).json({ "message": "send was mail", "status": true })

    } catch (error) {
        console.log(error)
        return res.status(505).json({ "error": "Internal server error", "status": false })
    }
})
authRouter.post("/frisruserornot", async (req, res) => {
    try {
        const { email } = req.body;
        const IstUserHaveAccount = await User.findOne({ email });
        console.log(IstUserHaveAccount);
        if (IstUserHaveAccount) {
            return res.status(400).json({ "message": "Already have an account.", status: false })
        }
        return res.status(200).json({ status: true })
    } catch (error) {
        console.log(error)
        return res.status(505).json({ "error": "Internal server error", "status": false })
    }
})
authRouter.post("/otpverify", async (req, res) => {
    try {
        const { fotp } = req.body;
        if (otp == fotp) {
            return res.status(200).json({ "message": "Vrifyed", "status": true })
        }
        return res.status(400).json({ "message": "Not Vrifyed", "status": false })

    } catch (error) {
        console.log(error)
        return res.status(505).json({ "error": "Internal server error", "status": false })
    }
})
authRouter.post("/register", upload.single('profilepic'), async (req, res) => {
    try {
        const { fullname, password, email, collagename, bio, skill, githublink, linkedinlink, protfolio } = JSON.parse(req.body.userinfo);
        const IsFristUser = User.findOne({ email: email });
        if (!IsFristUser) {
            return res.status(400).json({ "message": "Already have an account.", status: false })
        }
        let imgurl = ""
        console.log(req.file)
        if (req.file) {
            const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
                folder: "user_profiles", // Optional folder in Cloudinary
            });
            fs.unlinkSync(req.file.path);
            imgurl = cloudinaryResponse.secure_url;
        }
        const slat = await bcrypt.genSalt(12);
        const haspass = await bcrypt.hash(password, slat);
        const newuser = new User({
            fullname,
            email,
            image_url: imgurl,
            collagename,
            bio,
            skill,
            githublink,
            linkedinlink,
            protfolio,
            password: haspass
        })
        await newuser.save();
        return res.status(200).json({ "message": "Register done", status: true })


    } catch (error) {
        console.log(error)
        return res.status(505).json({ "error": "Internal server error", "status": false })
    }
})
authRouter.post("/login", async (req, res) => {
    try {

        const { email, password } = req.body;
        const finduser = await User.findOne({ email })
        if (!finduser) {
            return res.status(404).json({ "status": false, "message": "Invalid credential" })
        }
        const chake_pass = await bcrypt.compare(password, finduser.password)
        if (!chake_pass) {
            return res.status(400).json({ "status": false, "message": "Invalid credential" })
        }
        const authtoken = jwt.sign({
            user: finduser._id,
            email:finduser.email
        }, process.env.JWT_SERECT)
        return res.status(200).json({ "status": true, "message": "login Successful", "token": authtoken })
    } catch (error) {
        console.log(error)
        return res.status(505).json({ "error": "Internal server error" })
    }

})
authRouter.post("/login-email", async (req, res) => {
    try {

        const { email } = req.body;
        const finduser = await User.findOne({ email })
        if (!finduser) {
            return res.status(404).json({ "status": false, "message": "Invalid credential" })
        }
        return res.status(200).json({ "message": "Login done", status: true })

    } catch (error) {
        console.log(error)
        return res.status(505).json({ "error": "Internal server error" })
    }

})

authRouter.get("/getuser", fetchuer, async (req, res) => {
    try {
        const email = req.email;
        const finduser = await User.findOne({ email: email }).select("-password")
        if (!finduser) {
            return res.status(404).json({ "msg": "User not found", status: false })
        }
        return res.status(200).json({ "msg": "User Found", userdata: finduser, status: true })
    } catch (error) {
        console.log(error)
        return res.status(505).json({ "error": "Internal server error", status: false })

    }
})
export default authRouter;