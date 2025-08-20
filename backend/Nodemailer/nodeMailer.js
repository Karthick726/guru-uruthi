const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, 
    auth: {
      user: "@gmail.com",
      pass: "",
    },
  });
  
module.exports=transporter;