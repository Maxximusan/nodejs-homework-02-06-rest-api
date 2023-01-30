const express = require("express");

const router = express.Router();

const {
  getContact,
  contactByIdGet,
  contactRemove,
  contactAdd,
  contactUpdate,
  contactUpdateFavorite,
} = require("../../controllers/contactController");

const { validation, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

router.get("/", getContact);

router.get("/:contactId", isValidId, contactByIdGet);

router.post("/", validation(schemas.addSchema), contactAdd);

router.delete("/:contactId", isValidId, contactRemove);

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.updateSchema),
  contactUpdate
);

router.patch(
  "/: contactId/favorite",
  isValidId,
  validation(schemas.updateFavoriteSchema),
  contactUpdateFavorite
);

module.exports = router;
