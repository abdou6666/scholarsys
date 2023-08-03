const Formation = require('../models/formation');
const create = (req, res, next) => {
	Formation.create(req.body)
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const aff = (req, res, next) => {
	Formation.findAll()
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const modifier = (req, res, next) => {
	Formation.update(
		{
			nom: req.body.nom,
			montant_anuelle: req.body.montant_anuelle,
			duree_anuelle: req.body.duree_anuelle,
			duree_mensuelle: req.body.duree_mensuelle,
			date_echeance: req.body.date_echeance
		},
		{ where: { id: req.params.id } }
	)
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const supprimer = (req, res, next) => {
	Formation.destroy({ where: { id: req.params.id } })
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(500).send(err));
};
const count = (req, res, next) => {
	const FormationCount =  Formation.count((count)=>count)
    if (! FormationCount){
        res.status(500).json({success:false})

    }
    
	FormationCount.then(function(result) { res.send({
        count:result
    })});
}
module.exports = {
	create,
	aff,
	modifier,
	supprimer,
	count
};
