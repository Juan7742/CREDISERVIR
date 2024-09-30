const Joi = require('joi');

const asistenteSchema = Joi.object({
  nombre: Joi.string().required(),
  apellido: Joi.string().required(),
  fecha_nacimiento: Joi.date().iso().optional(),
  email: Joi.string().email().required(),
  celular: Joi.string().optional(),
});

const validateAsistente = (req, res, next) => {
  const { error } = asistenteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateAsistente;
