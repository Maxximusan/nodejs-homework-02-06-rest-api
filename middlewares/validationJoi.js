
const Joi = require("joi");

module.exports = {
  addContactPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),

      phone: Joi.string().required(),
    });
    const validationRresult = schema.validate(req.body);
    if (validationRresult.error) {
      return res.status(400).json({ status: validationRresult.error.details });
    }

    next();
  },

  updateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30),

      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),

      phone: Joi.string().min(1),
    });
    const validationRresult = schema.validate(req.body);
    if (validationRresult.error) {
      return res.status(400).json({ status: validationRresult.error.details });
    }

    next();
  },
};
