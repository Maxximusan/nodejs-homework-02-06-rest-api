const express = require("express");

const {
  validation,
  tokenVerification,
  controllerWrapper,
  upload,
} = require("../../middlewares");
const { singup, login, logout } = require("../../controllers/auth");
const {
  getCurrent,
  updateSubscription,
  updateAvatar,
  verifyEmail,
} = require("../../controllers/user");

const {
  joiSingupSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require("../../Schemas/Schemas");

const router = express.Router();

router.post("/singup", validation(joiSingupSchema), controllerWrapper(singup));
router.post("/login", validation(joiLoginSchema), controllerWrapper(login));
router.get("/logout", tokenVerification, controllerWrapper(logout));

router.patch(
  "/",
  tokenVerification,
  validation(joiSubscriptionSchema),
  controllerWrapper(updateSubscription)
);

router.get("/current", tokenVerification, controllerWrapper(getCurrent));

router.patch(
  "/avatars",
  tokenVerification,
  upload.single("avatar"),
  controllerWrapper(updateAvatar)
);

router.get("/verify/:verificationToken", controllerWrapper(verifyEmail));

module.exports = router;
