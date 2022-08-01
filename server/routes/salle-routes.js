const express = require('express');
const route = express.Router();
const salleController = require('../controllers/salleController');
route.post('/createSalle', salleController.create);
route.get('/salle', salleController.aff);

route.patch('/salle/:id', salleController.modifier);
route.delete('/salle/:id', salleController.supprimer);

module.exports = route;
