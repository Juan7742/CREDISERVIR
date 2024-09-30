const Evento = require('../models/eventos');

// Obtener todos los eventos
exports.getAllEventos = async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo evento
exports.createEvento = async (req, res) => {
  try {
    const evento = await Evento.create(req.body);
    res.status(201).json(evento);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un evento existente
exports.updateEvento = async (req, res) => {
  try {
    const [updated] = await Evento.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedEvento = await Evento.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedEvento);
    } else {
      res.status(404).json({ error: 'Evento no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un evento
exports.deleteEvento = async (req, res) => {
  try {
    await Evento.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
