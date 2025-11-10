const express = require('express');
const router = express.Router();
const docenteController = require('../controllers/docente.controller');
const { isAuthenticated, hasRole, canEdit } = require('../middleware/auth.middleware');

router.get('/info/:profesorId?', isAuthenticated, canEdit, docenteController.getInfo);
router.post('/mi-info', isAuthenticated, hasRole(3), docenteController.getMiInfo);

module.exports = router;