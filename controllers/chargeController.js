const db = require ('../models')

const create = (req,res,next)=>{
    db.charge.create(req.body)
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))


}
const aff = (req,res,next)=>{
    db.charge.findAll()
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}
const modifier =  (req,res,next) =>{
    db.charge.update({
        designation:req.body.designation,
        code_facture:req.body.code_facture,
        montant_facture:req.body.montant_facture,
        date_ajout:req.body.date_ajout
    }, {where:{id:req.params.id}})  
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}
const supprimer =  (req,res,next) =>{
    db.charge.destroy({where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(500).send(err))
    

}
module.exports= {
    create,
    aff,
    modifier,
    supprimer

}