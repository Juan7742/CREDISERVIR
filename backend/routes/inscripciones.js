const express = require('express');
const router = express.Router();
const inscripcionesController = require('../controllers/inscripcionesController');
const validateInscripcion = require('../validators/inscripcionesValidator');

// Obtener todas las inscripciones
router.get('/', inscripcionesController.getAllInscripciones);

// Crear una nueva inscripción
router.post('/', validateInscripcion, inscripcionesController.createInscripcion);

// Actualizar una inscripción existente
router.put('/:id', inscripcionesController.updateInscripcion);

// Eliminar una inscripción
router.delete('/:id', inscripcionesController.deleteInscripcion);

module.exports = router;
