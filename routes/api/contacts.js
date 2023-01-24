const express = require("express");

const router = express.Router();

const {
  getContact,
  contactByIdGet,
  contactRemove,
  contactAdd,
  contactUpdate,
} = require("../../controllers/contactController");

router.get("/", getContact);

router.get("/:contactId", contactByIdGet);

router.post("/", contactAdd);

router.delete("/:contactId", contactRemove);

router.put("/:contactId", contactUpdate);

module.exports = router;
