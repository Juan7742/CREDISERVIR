const Inscripcion = require('../models/inscripciones');

// Obtener todas las inscripciones
exports.getAllInscripciones = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.findAll();
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva inscripción
exports.createInscripcion = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.create(req.body);
    res.status(201).json(inscripcion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una inscripción existente
exports.updateInscripcion = async (req, res) => {
  try {
    //const [updated]: Desestructuramos el array solo para obtener el número de filas afectadas por la operación de actualización.
    const [updated] = await Inscripcion.update(req.body, { where: { id: req.params.id } });

    if (updated) {
      const updatedInscripcion = await Inscripcion.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedInscripcion);
    } else {
      res.status(404).json({ error: 'Inscripción no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una inscripción
exports.deleteInscripcion = async (req, res) => {
  try {
    await Inscripcion.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
