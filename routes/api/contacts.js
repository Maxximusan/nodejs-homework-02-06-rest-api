const express = require("express");

const router = express.Router();

const {
  getContact,
  contactByIdGet,
  contactRemove,
  contactAdd,
  contactUpdate,
  contactUpdateFavorite,
} = require("../../controllers/contacts/contactController");

const {
  validation,
  isValidId,
  tokenVerification,
  controllerWrapper,
} = require("../../middlewares");

const schemas = require("../../schemas/schemas");

router.get("/", tokenVerification, controllerWrapper(getContact));

router.get("/:contactId", isValidId, controllerWrapper(contactByIdGet));

router.post(
  "/",
  tokenVerification,
  validation(schemas.addSchema),
  controllerWrapper(contactAdd)
);

router.delete("/:contactId", isValidId, controllerWrapper(contactRemove));

router.put(
  "/:contactId",
  isValidId,
  validation(schemas.updateSchema),
  controllerWrapper(contactUpdate)
);

router.patch(
  "/: contactId/favorite",
  isValidId,
  validation(schemas.updateFavoriteSchema),
  controllerWrapper(contactUpdateFavorite)
);

module.exports = router;
