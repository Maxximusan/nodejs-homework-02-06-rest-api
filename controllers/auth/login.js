const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");

const User = require("../../models/users");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!user || !passCompare) {
      throw new Unauthorized({ message: "email or password is wrong" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = login;
