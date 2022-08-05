const express = require('express');
const SeanceController = require('../controllers/seance.controller');
const router = express.Router();

router.get('/', SeanceController.getAll);
router.get('/:id', SeanceController.getOne);
router.post('/', SeanceController.create);
router.patch('/:id', SeanceController.update);
router.delete('/:id', SeanceController.delete);

module.exports = router;
