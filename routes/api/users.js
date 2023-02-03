const express = require("express");

const { validation, tokenVerification } = require("../../middlewares");
const singup = require("../../controllers/auth/singup");
const login = require("../../controllers/auth/login");
const getCurrent = require("../../controllers/user/getCurrent");
const { joiSingupSchema, joiLoginSchema } = require("../../Schemas/Schemas");

const router = express.Router();

router.post("/singup", validation(joiSingupSchema), singup);
router.post("/login", validation(joiLoginSchema), login);
router.get("/current", tokenVerification, getCurrent);

module.exports = router;
