const { NotFound } = require("http-errors");

const  Contact  = require("../models/contacts");

const getContact = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const contactByIdGet = async (req, res, next) => {
  try {
    const IdContact = await Contact.findById(req.params.contactId);
    if (!IdContact) {
      throw new NotFound({ message: "not found" });
    }
    res.status(200).json(IdContact);
  } catch (error) {
    next(error);
  }
};

const contactRemove = async (req, res, next) => {
  try {
    const necessaryContact = await Contact.findByIdAndRemove(
      req.params.contactId
    );

    if (!necessaryContact) {
      const error = new Error({ message: "not found" });
      error.status = 404;
      throw error;
      // идентично с throw new NotFound({ message: "not found" });
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const contactAdd = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const contactUpdate = async (req, res, next) => {
  try {
    const necessaryContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );

    if (!necessaryContact) {
      throw new NotFound({ message: "not found" });
    }

    res.status(200).json({ necessaryContact });
  } catch (error) {
    next(error);
  }
};

const contactUpdateFavorite = async (req, res, next) => {
  try {
    const necessaryContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );

    if (!necessaryContact) {
      throw new NotFound({ message: "not found" });
    }

    res.status(200).json({ necessaryContact });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContact,
  contactByIdGet,
  contactRemove,
  contactAdd,
  contactUpdate,
  contactUpdateFavorite,
};
