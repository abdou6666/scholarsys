const express = require('express');
const EmploiController = require('../controllers/emploi.controller');
const router = express.Router();

router.get('/generate', EmploiController.generateEmploi);

router.get('/', EmploiController.getAll);
router.get('/:id', EmploiController.getOne);
router.post('/', EmploiController.create);

router.patch('/:id', EmploiController.update);
router.delete('/:id', EmploiController.delete);

module.exports = router;
