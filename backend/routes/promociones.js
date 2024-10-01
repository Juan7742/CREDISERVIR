const express = require('express');
const router = express.Router();
const promocionesController = require('../controllers/promocionesController');
const validatePromocion = require('../validators/promocionesValidator');

// Obtener todas las promociones
router.get('/', promocionesController.getAllPromociones);

// Crear una nueva promoción
router.post('/', validatePromocion, promocionesController.createPromocion);

// Actualizar una promoción existente
router.put('/:id', promocionesController.updatePromocion);

// Eliminar una promoción
router.delete('/:id', promocionesController.deletePromocion);

//obtener promociones por codigo
router.get('/:codigo', promocionesController.getPromocionPorCodigo);


module.exports = router;
