const express = require("express");

const router = express.Router();

const {
  getContact,
  contactByIdGet,
  contactRemove,
  contactAdd,
  contactUpdate,
} = require("../../controllers/contactController");

const { validation, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

router.get("/", getContact);

router.get("/:contactId", isValidId, contactByIdGet);

router.post("/", validation(schemas.addSchema), contactAdd);

router.delete("/:contactId", contactRemove);

router.put("/:contactId", validation(schemas.updateSchema), contactUpdate);

module.exports = router;
