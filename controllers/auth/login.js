const { Unauthorized } = require("http-errors");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/users");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.verify || !user.comparePassword(password)) {
    throw new Unauthorized({
      message: "email is wrong or not verify, or password is wrong",
    });
  }
  // const passCompare = bcrypt.compareSync(password, user.password);
  // if (!user || !passCompare) {
  //   throw new Unauthorized({ message: "email or password is wrong" });
  // }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        subscription: "starter",
      },
    },
  });
};

module.exports = login;
