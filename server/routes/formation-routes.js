
const express = require('express')
const route = express.Router()
const formationController = require ('../controllers/formationController')
route.post('/createFormation', formationController.create);
route.get('/formations', formationController.aff) ;  

route.patch('/formation/:id',formationController.modifier);
route.delete('/formation/:id',formationController.supprimer);


module.exports=route
