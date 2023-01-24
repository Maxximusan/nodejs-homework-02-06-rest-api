const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContact = async (req, res, next) => {
  const contacts = await listContacts();
  if (contacts) {
    return res.status(200).json({ contacts });
  }
  next();
};

const contactByIdGet = async (req, res, next) => {
  const IdContact = await getContactById(req.params.contactId);
  if (IdContact) {
    return res.status(200).json({ IdContact });
  }
  if (!IdContact) {
    return res.status(400).json({
      status: `failure, no contact with id ${req.params.contactId} found`,
    });
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
  console.log(newContact);
  if (newContact) {
    return res.status(201).json({ newContact });
  }
  next();
};

const contactUpdate = async (req, res, next) => {
  const necessaryContact = await updateContact(req.params.contactId, req.body);

  if (necessaryContact) {
    return res.status(201).json({ necessaryContact });
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
