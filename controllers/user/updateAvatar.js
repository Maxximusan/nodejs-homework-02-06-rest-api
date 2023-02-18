const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");

const User = require("../../models/users");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const imageName = `${id}_${originalname}`;
  const BASE_URL = "http://localhost:3000";
  try {
    const resultUpload = path.join(avatarsDir, imageName);

    await Jimp.read(tempUpload)
      .then((avatar) => {
        return avatar.resize(250, 250).write(resultUpload);
      })
      .catch((error) => {
        throw error;
      });

    // await fs.rename(tempUpload, resultUpload);

    // const avatarURL = path.join("avatars", imageName);
    const avatarURL = `${BASE_URL}/avatars/${imageName}`;
    // console.log(avatarURL);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
