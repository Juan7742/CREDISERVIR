const Joi = require('joi');

const eventoSchema = Joi.object({
  titulo: Joi.string().required(),
  descripcion: Joi.string().optional(),
  fecha: Joi.date().iso().required(),
  hora: Joi.string().required(),
  lugar: Joi.string().optional(),
  cupo_disponible: Joi.number().integer().min(0).required(),
  tipo: Joi.string().valid('gratuito', 'pago').required(),
  valor_base: Joi.number().positive().optional(),
  categorias: Joi.string().optional(),
  fecha_apertura: Joi.date().iso().required(),
  fecha_cierre: Joi.date().iso().greater(Joi.ref('fecha_apertura')).required(),
});

// Middleware de validación
const validateEvento = (req, res, next) => {
  console.log(req.body); // Verifica que el cuerpo de la solicitud sea correcto
  const { error } = eventoSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = validateEvento;
