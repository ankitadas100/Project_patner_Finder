import nodemailer from 'nodemailer'
import util from 'util'

const sendAcceptanceEmail = async (sendtoemail, eventName) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,      // Your email
            pass: process.env.PASSWORD    // App password (not your real password)
        }
    });

    const acceptanceEmailTemplateHTML = (eventName) => `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>DevForge Application Accepted</title>
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
    background:rgba(255,122,0,0.1);
    border: 1px solid #fff200;
    border-radius:8px;
    color:#FF7A00;
}

.info{
    font-size:15px;
    color:#bbbbbb;
    margin-top: 10px;
}

.highlight {
    color: #ffe100;
    font-weight: bold;
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

<h2>Application Accepted! 🎉</h2>

<p>Congratulations! We are thrilled to inform you that your application to contribute to <b>${eventName}</b> has been officially approved.</p>

<div class="status-box">
SELECTED
</div>

<p class="info">
The organization was highly impressed by your profile and skills. We are excited to have you join the team!
</p>

<p class="info" style="margin-top: 25px; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 20px;">
<b>What happens next?</b><br>
The project admin is currently processing your addition to the team. They will reach out to you shortly with further instructions, onboarding details, and your next steps.
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
        subject: `Congratulations! You've been selected for ${eventName}`,
        html: acceptanceEmailTemplateHTML(eventName),
    };

    // Convert sendMail to return a promise
    const sendMailAsync = util.promisify(transporter.sendMail.bind(transporter));

    try {
        const info = await sendMailAsync(mailOptions);
        console.log(`✅ Acceptance email sent for ${eventName}:`, info.response);
        return info.response;
    } catch (error) {
        console.error("❌ Error sending acceptance email:", error);
        throw error;
    }
}

export default sendAcceptanceEmail;