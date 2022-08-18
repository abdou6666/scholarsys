const db = require('../config/db.config');
const Classe = require('../models/classe');
const Niveau = require('../models/niveau');
const create = (req, res, next) => {
	Classe.create(req.body)
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const aff = (req, res, next) => {
	Classe.findAll()
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const modifier = (req, res, next) => {
	Classe.update(
		{
			nom: req.body.nom,
			designation: req.body.designation,
			niveauId:req.body.niveauId
		},
		{ where: { id: req.params.id } }
	)
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const supprimer = (req, res, next) => {
	Classe.destroy({ where: { id: req.params.id } })
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(500).send(err));
};
const ClasseCount =  (req, res) => {
	//const count_Classe =  Classe.count({ col: 'Id', group: "niveauId",  })
	Classe.findAndCountAll(
		{
			
			attributes: ['niveauId' ],
			include: [
				{
					model: Niveau,
					attributes: [],
					include: [],
				    
				}
			],	
			group: ['niveauId'],
			raw:true
			
		}
	).then(function (count_Classe) {
		res.send(count_Classe);
	});
}
module.exports = {
	create,
	aff,
	modifier,
	supprimer,
	ClasseCount
};
