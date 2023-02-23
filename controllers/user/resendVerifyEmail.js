const { NotFound, BadRequest } = require("http-errors");
const sendEmail = require("../../helpers/sendEmail");

const User = require("../../models/users");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound({ message: `user with email ${email} is not found ` });
  }

  if (user.verify) {
    throw BadRequest({ message: "user is already verify" });
  }

  const mail = {
    to: email,
    subject: "Тема письма",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${user.verificationToken}">Подтвердить email</a>`,
  };
  await sendEmail(mail);
  res.json({ message: "Email verify resend" });
};

module.exports = resendVerifyEmail;
