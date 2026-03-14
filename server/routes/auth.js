import express from "express"
import sendemail from "../middlewares/sendemail.js";
const authRouter = express.Router();
let otp = null;


authRouter.post("/sendemail", async (req, res) => {
    try {
        const { email } = req.body;
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
authRouter.post("/otpverify",async(req,res)=>{
    try {
        const {fotp}= req.body;
        if(otp==fotp){
            return res.status(200).json({ "message": "Vrifyed", "status": true })
        }
        return res.status(400).json({ "message": "Not Vrifyed", "status": false })

    } catch (error) {
        console.log(error)
        return res.status(505).json({ "error": "Internal server error", "status": false })
    }
})

export default authRouter;