const express = require ("express")
const app = express()
const db = require('./models')
const niveauRouter =require("./routers/niveau-routes")
const classeRouter =require("./routers/classe-routes")
const formationRouter =require("./routers/formation-routes")
const chargeRouter = require ("./routers/charge-routes")
const salleRouter=require("./routers/salle-routes")
app.use (express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',niveauRouter)
app.use('/',classeRouter)
app.use('/',formationRouter)
app.use('/',chargeRouter)
app.use('/',salleRouter)




db.sequelize.sync().then(()=>
app.listen(3000,()=>console.log("jawna behi"))
 
)
