const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContact = async (req, res, next) => {
  const contacts = await listContacts();

  return res.status(200).json({ contacts });
};

const contactByIdGet = async (req, res, next) => {
  const IdContact = await getContactById(req.params.contactId);
  if (IdContact) {
    return res.status(200).json({ IdContact });
  }

  next();
};

const contactRemove = async (req, res, next) => {
  const necessaryContact = await removeContact(req.params.contactId);
  if (necessaryContact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  next();
};

const contactAdd = async (req, res, next) => {
  const newContact = await addContact(req.body);

  if (newContact) {
    return res.status(201).json({ newContact });
  }
  next();
};

const contactUpdate = async (req, res, next) => {
  const necessaryContact = await updateContact(req.params.contactId, req.body);

  if (necessaryContact) {
    return res.status(200).json({ necessaryContact });
  }
  next();
};

module.exports = {
  getContact,
  contactByIdGet,
  contactRemove,
  contactAdd,
  contactUpdate,
};
