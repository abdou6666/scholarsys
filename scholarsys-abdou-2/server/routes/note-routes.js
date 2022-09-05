
const express = require('express')
const route = express.Router()
const noteController = require ('../controllers/noteController')
route.post('/createNote', noteController.create);
route.get('/note', noteController.aff) ;  

route.patch('/note/:id',noteController.modifier);
route.delete('/note/:id',noteController.supprimer);
route.get('/moyenne', noteController.Moyenne) ;
route.get('/moyennes', noteController.MoyenneParam) ;
route.get('/statMoy', noteController.statMoy) ;
//route.get('/bonneMoy', noteController.bonneMoy) ;
route.get('/bonneMoy', noteController.BstatMoy) ;
route.get('/mauvaiseMoy', noteController.MstatMoy) ;


module.exports=route
