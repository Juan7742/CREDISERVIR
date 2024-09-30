const Joi = require('joi');

const promocionSchema = Joi.object({
  codigo: Joi.string().required(),
  porcentaje_descuento: Joi.number().min(0).max(100).required(),
  fecha_inicio: Joi.date().iso().optional(),
  fecha_fin: Joi.date().iso().greater(Joi.ref('fecha_inicio')).optional(),
  estado: Joi.string().valid('activo', 'inactivo').required(),
});

const validatePromocion = (req, res, next) => {
  const { error } = promocionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validatePromocion;
