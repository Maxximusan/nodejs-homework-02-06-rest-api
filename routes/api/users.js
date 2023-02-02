const express = require("express");

const validation = require("../../middlewares/validation");
const singup = require("../../controllers/auth/singup");
const login = require("../../controllers/auth/login");
const { joiSingupSchema, joiLoginSchema } = require("../../Schemas/Schemas");

const router = express.Router();

router.post("/singup", validation(joiSingupSchema), singup);
router.post("/login", validation(joiLoginSchema), login);

module.exports = router;
