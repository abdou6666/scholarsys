
const express = require('express')
const route = express.Router()
const matiereController = require ('../controllers/matiereController')
route.post('/createMatiere', matiereController.create);
route.get('/matiere', matiereController.aff) ;  

route.patch('/matiere/:id',matiereController.modifier);
route.delete('/matiere/:id',matiereController.supprimer);


module.exports=route
