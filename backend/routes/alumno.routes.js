const express = require('express');
const router = express.Router();
const alumnoController = require('../controllers/alumno.controller');
const { isAuthenticated, hasRole, canEdit } = require('../middleware/auth.middleware');

router.get('/info/:boleta?', isAuthenticated, canEdit, alumnoController.getInfo);
router.post('/mi-info', isAuthenticated, hasRole(2), alumnoController.getMiInfo);

module.exports = router;