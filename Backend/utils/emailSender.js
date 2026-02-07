const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function emailSender(emailInfo) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: emailInfo.from, // sender address
    to: emailInfo.to, // list of receivers
    subject: emailInfo.subject, // Subject line
    text: emailInfo.text, // plain text body
    html: emailInfo.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = emailSender