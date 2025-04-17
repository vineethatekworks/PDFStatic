const nodemailer = require("nodemailer");
const { smtpConfig } = require("../config/smtpConfig.js");

async function sendEmail (to, pdfBuffer){
  try {
    const transporter = nodemailer.createTransport(smtpConfig);

    const mailOptions = {
      from: '"PDF Generator" <shaikmoinbasha333@gmail.com>',
      to: to,
      subject: "Your Generated PDF",
      text: "Please find the PDF attached.",
      attachments: [
        {
          filename: `${to.split('@')[0]}-generated.pdf`,
          content: pdfBuffer,
          encoding: "base64",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    return info.accepted.length > 0;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = { sendEmail };
