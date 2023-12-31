const nodemailer=require("nodemailer");
const dotenv=require("dotenv");
dotenv.config()

const sendEmail=async (options)=>{

    const transporter=nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        service:process.env.SMTP_SERVICE,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    })

    const mailOptions={
        from:process.env.SMTP_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message,
        html:options.html,
        attachments:options.attachments
    }
    await transporter.sendMail(mailOptions);
}

module.exports=sendEmail;