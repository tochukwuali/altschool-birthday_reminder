const path = require('path');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendBirthdayEmail({ to, username }) {
  const templatePath = path.join(__dirname, '..', 'views', 'emails', 'birthday.ejs');
  const html = await ejs.renderFile(templatePath, { username });

  const info = await transporter.sendMail({
    from: `Birthday Bot <${process.env.EMAIL_USER}>`,
    to,
    subject: `Happy Birthday, ${username}! 🎉`,
    html,
  });
  return info;
}

module.exports = { sendBirthdayEmail };


