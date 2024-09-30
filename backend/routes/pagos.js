const express = require('express');
const router = express.Router();
const pagosController = require('../controllers/pagosController'); // Importar controladores
const validatePago = require('../validators/pagosValidator'); // Importar validación

// Obtener todos los pagos
router.get('/', pagosController.getAllPagos);

// Crear un nuevo pago
router.post('/', validatePago, pagosController.createPago);

// Actualizar un pago existente
router.put('/:id', pagosController.updatePago);

// Eliminar un pago
router.delete('/:id', pagosController.deletePago);

module.exports = router;
