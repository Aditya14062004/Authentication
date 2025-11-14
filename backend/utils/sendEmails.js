const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, text) => {
  console.log("Attempting to send email...");
  console.log("To:", to);
  console.log("Using:", process.env.EMAIL_USER);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });
    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Error while sending email:", err);
    throw err;
  }
};

module.exports = sendEmail;