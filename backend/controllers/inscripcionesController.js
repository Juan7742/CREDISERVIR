const Inscripcion = require('../models/inscripciones');
const Evento = require('../models/eventos');
const { Sequelize } = require('sequelize'); // Importa Sequelize para manejar transacciones

// Obtener todas las inscripciones
exports.getAllInscripciones = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.findAll();
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva inscripción y actualizar el cupo disponible
exports.createInscripcion = async (req, res) => {
  const { evento_id, asistente_id, tipo_entrada, valor_total } = req.body;

  const transaction = await Sequelize.transaction(); // Crear una transacción

  try {
    // Buscar el evento correspondiente
    const evento = await Evento.findByPk(evento_id, { lock: true, transaction });

    // Verificar si el evento fue encontrado
    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado.' });
    }

    // Verificar si hay cupos disponibles
    if (evento.cupo_disponible > 0) {
      // Crear la inscripción
      const inscripcion = await Inscripcion.create({
        evento_id,
        asistente_id,
        tipo_entrada,
        valor_total,
        estado: 'confirmado',
        fecha_inscripcion: new Date(),
      }, { transaction });

      // Actualizar el cupo disponible del evento
      evento.cupo_disponible -= 1;
      await evento.save({ transaction });

      // Confirmar la transacción
      await transaction.commit();

      res.status(201).json(inscripcion);
    } else {
      await transaction.rollback(); // Deshacer la transacción en caso de error
      res.status(400).json({ error: 'No hay cupos disponibles para este evento.' });
    }
  } catch (error) {
    await transaction.rollback(); // Deshacer la transacción en caso de error
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una inscripción existente
exports.updateInscripcion = async (req, res) => {
  try {
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

// Eliminar una inscripción y devolver el cupo al evento
exports.deleteInscripcion = async (req, res) => {
  const transaction = await Sequelize.transaction(); // Crear una transacción
  try {
    // Buscar la inscripción antes de eliminarla
    const inscripcion = await Inscripcion.findByPk(req.params.id, { transaction });
    if (!inscripcion) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }

    // Eliminar la inscripción
    await Inscripcion.destroy({ where: { id: req.params.id }, transaction });

    // Devolver el cupo al evento
    const evento = await Evento.findByPk(inscripcion.evento_id, { transaction });
    if (evento) {
      evento.cupo_disponible += 1;
      await evento.save({ transaction });
    }

    // Confirmar la transacción
    await transaction.commit();
    res.status(204).send();
  } catch (error) {
    await transaction.rollback(); // Deshacer la transacción en caso de error
    res.status(400).json({ error: error.message });
  }
};
