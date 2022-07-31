const db = require ('../models')

const create = (req,res,next)=>{
    db.salle.create(req.body)
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))


}
const aff = (req,res,next)=>{
    db.salle.findAll()
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}
const modifier =  (req,res,next) =>{
    db.salle.update({
        designation:req.body.designation
    }, {where:{id:req.params.id}})  
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}
const supprimer =  (req,res,next) =>{
    db.salle.destroy({where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(500).send(err))
    

}
module.exports= {
    create,
    aff,
    modifier,
    supprimer

}