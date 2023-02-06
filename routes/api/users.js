const express = require("express");

const {
  validation,
  tokenVerification,
  controllerWrapper,
} = require("../../middlewares");
const { singup, login, logout } = require("../../controllers/auth");
const { getCurrent, updateSubscription } = require("../../controllers/user");

const {
  joiSingupSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require("../../Schemas/Schemas");

const router = express.Router();

router.post("/singup", validation(joiSingupSchema), controllerWrapper(singup));
router.post("/login", validation(joiLoginSchema), controllerWrapper(login));
router.get("/current", tokenVerification, controllerWrapper(getCurrent));
router.get("/logout", tokenVerification, controllerWrapper(logout));
router.patch(
  "/",
  tokenVerification,
  validation(joiSubscriptionSchema),
  controllerWrapper(updateSubscription)
);

module.exports = router;
