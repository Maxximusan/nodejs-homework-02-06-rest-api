const { NotFound } = require("http-errors");

const Contact = require("../../models/contacts");

const getContact = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id name email");

  res.status(200).json(contacts);
};

const contactByIdGet = async (req, res, next) => {
  const IdContact = await Contact.findById(req.params.contactId);
  if (!IdContact) {
    throw new NotFound({ message: "not found" });
  }
  res.status(200).json(IdContact);
};

const contactRemove = async (req, res, next) => {
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
};

const contactAdd = async (req, res, next) => {
  const { _id } = req.user;
  const newContact = await Contact.create({ ...req.body, owner: _id });

  // res.status(201).json(newContact);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      newContact,
    },
  });
};

const contactUpdate = async (req, res, next) => {
  const necessaryContact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  if (!necessaryContact) {
    throw new NotFound({ message: "not found" });
  }

  res.status(200).json({ necessaryContact });
};

const contactUpdateFavorite = async (req, res, next) => {
  const necessaryContact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );

  if (!necessaryContact) {
    throw new NotFound({ message: "not found" });
  }

  res.status(200).json({ necessaryContact });
};

module.exports = {
  getContact,
  contactByIdGet,
  contactRemove,
  contactAdd,
  contactUpdate,
  contactUpdateFavorite,
};
