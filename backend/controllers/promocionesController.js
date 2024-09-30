const Promocion = require('../models/promociones');

// Obtener todas las promociones
exports.getAllPromociones = async (req, res) => {
  try {
    const promociones = await Promocion.findAll();
    res.json(promociones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva promoción
exports.createPromocion = async (req, res) => {
  try {
    const promocion = await Promocion.create(req.body);
    res.status(201).json(promocion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una promoción existente
exports.updatePromocion = async (req, res) => {
  try {
    const [updated] = await Promocion.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedPromocion = await Promocion.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedPromocion);
    } else {
      res.status(404).json({ error: 'Promoción no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una promoción
exports.deletePromocion = async (req, res) => {
  try {
    await Promocion.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
