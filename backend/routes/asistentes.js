const express = require('express');
const router = express.Router();
const asistentesController = require('../controllers/asistentesController'); // Importar controladores
const validateAsistente = require('../validators/asistentesValidator'); // Importar validación

// Obtener todos los asistentes
router.get('/', asistentesController.getAllAsistentes);

// Crear un nuevo asistente
router.post('/', validateAsistente, asistentesController.createAsistente);

// Actualizar un asistente existente
router.put('/:id', asistentesController.updateAsistente);

// Eliminar un asistente
router.delete('/:id', asistentesController.deleteAsistente);

module.exports = router;
