const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = {
  send: (data) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    // eslint-disable-next-line prefer-const
    let response = [];
    const mailOptions = {
      from: process.env.EMAIL,
      to: 'sulfikardi25@gmail.com',
      subject: 'Email Confirmation',
      text: 'Registrasi Akun',
      html: '<p>Click<a href="http://localhost:8080/auth/?activated=' + encrypt +'">here</a></p>'
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
        response.message = 'email failed';
      } else {
        response.error = false;
        response.message = 'Successfully send email nodemailer';
      }
    });
    return response;
  },


};