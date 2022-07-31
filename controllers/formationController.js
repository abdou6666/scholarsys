const db = require ('../models')

const create = (req,res,next)=>{
    db.formation.create(req.body)
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))


}
const aff = (req,res,next)=>{
    db.formation.findAll()
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}
const modifier =  (req,res,next) =>{
    db.formation.update({
        nom:req.body.nom,
        montant_anuelle:req.body.montant_anuelle,
        duree_anuelle:req.body.duree_anuelle,
        duree_mensuelle:req.body.duree_mensuelle,
        date_echeance:req.body.date_echeance

    }, {where:{id:req.params.id}})  
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
}
const supprimer =  (req,res,next) =>{
    db.formation.destroy({where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(500).send(err))
    

}
module.exports= {
    create,
    aff,
    modifier,
    supprimer

}