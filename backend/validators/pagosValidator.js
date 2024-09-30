const Joi = require('joi');

const pagoSchema = Joi.object({
  inscripcion_id: Joi.number().integer().required(),
  monto: Joi.number().positive().required(),
});

const validatePago = (req, res, next) => {
  const { error } = pagoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validatePago;
