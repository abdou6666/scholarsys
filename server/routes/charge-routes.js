
const express = require('express')
const route = express.Router()
const chargeController = require ('../controllers/chargeController')
route.post('/createCharge', chargeController.create);
route.get('/charge', chargeController.aff) ;  

route.patch('/charge/:id',chargeController.modifier);
route.delete('/charge/:id',chargeController.supprimer);


module.exports=route
