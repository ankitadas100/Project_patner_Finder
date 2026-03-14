import nodemailer from 'nodemailer'
import util from 'util'
const sendemail = async (sendtoemail,otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,      // Your email
            pass: process.env.PASSWORD    // App password (not your real password)
        }
    });
    const otpEmailTemplateHTML = (otp) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>DevForge OTP Verification</title>
<style>
body{
    margin:0;
    padding:0;
    background:#0d0d0d;
    font-family: Arial, Helvetica, sans-serif;
}

.container{
    max-width:600px;
    margin:auto;
    background:#111;
    border-radius:10px;
    overflow:hidden;
    border:1px solid rgba(255,255,255,0.07);
}

.header{
    background: linear-gradient(90deg,#FF7A00,#ff8f1f);
    padding:25px;
    text-align:center;
    color:white;
    font-size:26px;
    font-weight:bold;
    letter-spacing:1px;
}

.content{
    padding:40px 30px;
    color:#eaeaea;
    text-align:center;
}

.content h2{
    margin-top:0;
    font-size:22px;
}

.otp-box{
    display:inline-block;
    margin:25px 0;
    padding:18px 30px;
    font-size:30px;
    font-weight:bold;
    letter-spacing:6px;
    background:rgba(255,255,255,0.07);
    border-radius:8px;
    color:#FF7A00;
}

.info{
    font-size:14px;
    color:#bbbbbb;
}

.footer{
    padding:20px;
    text-align:center;
    font-size:13px;
    color:#888;
    border-top:1px solid rgba(255,255,255,0.07);
}
</style>
</head>

<body>

<div class="container">

<div class="header">
DevForge
</div>

<div class="content">

<h2>Verify Your Email</h2>

<p>Welcome to <b>DevForge</b> 👨‍💻</p>

<p>Use the following One Time Password (OTP) to complete your signup process.</p>

<div class="otp-box">
${otp}
</div>

<p class="info">
This OTP is valid for the next <b>10 minutes</b>.<br>
Do not share this code with anyone.
</p>

</div>

<div class="footer">
© 2026 DevForge • Build. Share. Innovate.
</div>

</div>

</body>
</html>
    `;

    const mailOptions = {
        from: process.env.EMAIL,    // Fixed the `from` field
        to: sendtoemail,
        subject: "OTP for register",
        html: otpEmailTemplateHTML(otp),
    };

    // Convert sendMail to return a promise
    const sendMailAsync = util.promisify(transporter.sendMail.bind(transporter));

    try {
        const info = await sendMailAsync(mailOptions);
        console.log("✅ Email sent:", info.response);
        return info.response;  // Return the response
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw error;   // Throw error for proper handling
    }
}
export default sendemail;