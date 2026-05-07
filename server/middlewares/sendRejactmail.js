import nodemailer from 'nodemailer'
import util from 'util'

const sendRejectionEmail = async (sendtoemail, eventName) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,      // Your email
            pass: process.env.PASSWORD    // App password (not your real password)
        }
    });

    const rejectionEmailTemplateHTML = (eventName) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>DevForge Application Update</title>
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
    line-height: 1.6;
}

.content h2{
    margin-top:0;
    font-size:24px;
    color: #ffffff;
}

.status-box{
    display:inline-block;
    margin:25px 0;
    padding:15px 30px;
    font-size:20px;
    font-weight:bold;
    letter-spacing:4px;
    background:rgba(255,255,255,0.05);
    border: 1px solid #555555;
    border-radius:8px;
    color:#aaaaaa;
}

.info{
    font-size:15px;
    color:#bbbbbb;
    margin-top: 10px;
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

<h2>Application Status Update</h2>

<p>Thank you for taking the time to apply for <b>${eventName}</b>. We sincerely appreciate your interest and the effort you put into your application.</p>

<div class="status-box">
NOT SELECTED
</div>

<p class="info">
We received a high volume of excellent applications for this project. After careful review, we regret to inform you that we are unable to move forward with your application at this time.
</p>

<p class="info" style="margin-top: 25px; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 20px;">
Please don't let this discourage you. The developer community is vast, and there will be many more opportunities to collaborate and showcase your skills.<br><br>
Keep building, and we hope to see you apply for future events!
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
        from: process.env.EMAIL,
        to: sendtoemail,
        subject: `Update regarding your application for ${eventName}`,
        html: rejectionEmailTemplateHTML(eventName),
    };

    const sendMailAsync = util.promisify(transporter.sendMail.bind(transporter));

    try {
        const info = await sendMailAsync(mailOptions);
        console.log(`✅ Rejection email sent for ${eventName}:`, info.response);
        return info.response;
    } catch (error) {
        console.error("❌ Error sending rejection email:", error);
        throw error;
    }
}

export default sendRejectionEmail;