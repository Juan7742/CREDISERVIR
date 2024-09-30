const Pago = require('../models/pagos');

// Obtener todos los pagos
exports.getAllPagos = async (req, res) => {
  try {
    const pagos = await Pago.findAll();
    res.json(pagos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo pago
exports.createPago = async (req, res) => {
  try {
    const pago = await Pago.create(req.body);
    res.status(201).json(pago);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un pago existente
exports.updatePago = async (req, res) => {
  try {
    const [updated] = await Pago.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedPago = await Pago.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedPago);
    } else {
      res.status(404).json({ error: 'Pago no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un pago
exports.deletePago = async (req, res) => {
  try {
    await Pago.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
