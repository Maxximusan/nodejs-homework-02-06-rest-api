const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { uid } = require("uid");

const User = require("../../models/users");
const { sendEmail } = require("../../helpers/sendEmail");

const singup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict({ message: "Email in use" });
  }

  const avatarURL = gravatar.url(email);

  const verificationToken = uid();

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    name,
    email,
    avatarURL,
    password: hashPassword,
    subscription: "starter",
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Тема письма",
    html: `<a target="_blank" href="http://localhost:3000/users/verify/${verificationToken}">Подтвердить email</a>`,
  };
  await sendEmail(mail);

  res.status(201).json(result);
  // res.status(201).json({
  //   status: "success",
  //   code: 201,
  //   data: {
  //     user: {
  //       email,
  //       name,
  //       avatarURL,
  //     },
  //   },
  // });
};

module.exports = singup;
