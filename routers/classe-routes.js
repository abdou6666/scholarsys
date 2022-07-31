
const express = require('express')
const route = express.Router()
const classeController = require ('../controllers/classeController')
route.post('/createClasse', classeController.create);
route.get('/classes', classeController.aff) ;  

route.patch('/classe/:id',classeController.modifier);
route.delete('/classe/:id',classeController.supprimer);


module.exports=route
