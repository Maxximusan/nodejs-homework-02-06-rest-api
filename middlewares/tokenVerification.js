const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

const { SECRET_KEY } = process.env;

const tokenVerification = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized({ message: "Not authorized" });
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      throw new Unauthorized({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = tokenVerification;
