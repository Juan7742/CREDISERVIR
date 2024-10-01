const express = require('express');
const router = express.Router();
const eventosController = require('../controllers/eventosController');
const validateEvento = require('../validators/eventosValidator');

// Obtener todos los eventos
router.get('/', eventosController.getAllEventos);

// Crear un nuevo evento
router.post('/', validateEvento, eventosController.createEvento);

// Actualizar un evento existente
router.put('/:id', eventosController.updateEvento);

// Eliminar un evento
router.delete('/:id', eventosController.deleteEvento);

module.exports = router;
