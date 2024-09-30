const Joi = require('joi');

const inscripcionSchema = Joi.object({
  evento_id: Joi.number().integer().required(),
  asistente_id: Joi.number().integer().required(),
  tipo_entrada: Joi.string().valid('gratis', 'general', 'VIP').required(),
  valor_total: Joi.number().positive().optional(),
  estado: Joi.string().valid('confirmado', 'cancelado').required(),
});

const validateInscripcion = (req, res, next) => {
  const { error } = inscripcionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateInscripcion;
