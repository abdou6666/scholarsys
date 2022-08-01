
const express = require('express')
const route = express.Router()
const niveauController = require ('../controllers/niveauController')
route.post('/createNiveau', niveauController.create);
route.get('/niveaus', niveauController.aff) ;  

route.patch('/niveau/:id',niveauController.modifier);
route.delete('/niveau/:id',niveauController.supprimer);


module.exports=route
