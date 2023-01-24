const express = require("express");

const router = express.Router();

const {
  getContact,
  contactByIdGet,
  contactRemove,
  contactAdd,
  contactUpdate,
} = require("../../controllers/contactController");

const {
  addContactPostValidation,
  updateContactValidation,
} = require("../../middlewares/validationJoi");

router.get("/", getContact);

router.get("/:contactId", contactByIdGet);

router.post("/", addContactPostValidation, contactAdd);

router.delete("/:contactId", contactRemove);

router.put("/:contactId", updateContactValidation, contactUpdate);

module.exports = router;
