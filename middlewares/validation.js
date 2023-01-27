const validation = (schema) => {
  return (req, res, next) => {
    const validationRresult = schema.validate(req.body);
    if (validationRresult.error) {
      return res.status(400).json({ status: validationRresult.error.details });
    }

    next();
  };
};
module.exports = validation;

// const validation = (schema) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       error.status = 400;
//       next(error);
//       return;
//     }
//     next();
//   };
// };
// module.exports = validation;
