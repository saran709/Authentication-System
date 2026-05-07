const nodemailer = require('nodemailer');

async function sendEmail({ to, subject, html, text }) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({ from: process.env.SMTP_USER, to, subject, text, html });
  return info;
}

module.exports = sendEmail;
