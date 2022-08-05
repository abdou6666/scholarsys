
const express = require('express')
const route = express.Router()
const noteController = require ('../controllers/noteController')
route.post('/createNote', noteController.create);
route.get('/note', noteController.aff) ;  

route.patch('/note/:id',noteController.modifier);
route.delete('/note/:id',noteController.supprimer);


module.exports=route
