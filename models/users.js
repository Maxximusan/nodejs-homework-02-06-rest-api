const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    //   subscription: {
    //     type: String,
    //     enum: ["starter", "pro", "business"],
    //     default: "starter",
    //   },
    //   token: {
    //     type: String,
    //     default: null,
    //   },
    // owner: {
    //   type: SchemaTypes.ObjectId,
    //   ref: "user",
    // },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
