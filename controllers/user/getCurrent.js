// const User = require("../../models/users");

const getCurrent = async (req, res, next) => {
  try {
    const { name, email } = req.User;
    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          name,
          email,
          subscription: "starter",
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
