const nodemailer = require("nodemailer");
const sendMail = async (options) => {
  //  Create A Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define Email Options
  const emailOptions = {
    from: '"ShopXPresS Support" <maddison53@ethereal.email>', // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message,
  };

  await transporter.sendMail(emailOptions);
};
module.exports = sendMail;
