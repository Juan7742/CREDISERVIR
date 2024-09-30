const Asistente = require('../models/asistentes');

// Obtener todos los asistentes
exports.getAllAsistentes = async (req, res) => {
  try {
    const asistentes = await Asistente.findAll();
    res.json(asistentes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo asistente
exports.createAsistente = async (req, res) => {
  try {
    const asistente = await Asistente.create(req.body);
    res.status(201).json(asistente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un asistente existente
exports.updateAsistente = async (req, res) => {
  try {
    const [updated] = await Asistente.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedAsistente = await Asistente.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedAsistente);
    } else {
      res.status(404).json({ error: 'Asistente no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un asistente
exports.deleteAsistente = async (req, res) => {
  try {
    await Asistente.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
