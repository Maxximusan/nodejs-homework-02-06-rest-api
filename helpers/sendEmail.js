// Вариант 2 - nodemailer
const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "bullettoothtony@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "bullettoothtony@meta.ua" };
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;

// ///////////////////////////

// const email = {
//   to: "dragonstonecave@gmail.com",
//   from: "bullettoothtony@meta.ua",
//   subject: "проверочное письмо",
//   html: "<p>новое письмо</p>",
// };

// transporter
//   .sendMail(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));

// ----------------------------------------------------------------------

// Вариант 1 - sendgrid

// const sgMail = require("@sendgrid/mail");

// require("dotenv").config();

// const { SENDGRID_API_KEY_SECOND } = process.env;
// console.log(SENDGRID_API_KEY_SECOND);
// sgMail.setApiKey(SENDGRID_API_KEY_SECOND);

// const sendEmail = async (data) => {
//   const email = { ...data, from: "dragonstonecave@gmail.com" };
//   try {
//     await sgMail.send(email);
//     return true;
//   } catch (error) {
//     // console.log(error);
//     throw error.message;
//   }
// };

// module.exports = sendEmail;

// //////////////////////////////////

// const email = {
//   to: "kasterleyrock@gmail.com",
//   from: "dragonstonecave@gmail.com",
//   subject: "проверочное письмо",
//   html: "<p>новое письмо</p>",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Email send success"))
//   .catch((error) => console.log(error.message));
