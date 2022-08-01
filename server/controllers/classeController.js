const db = require('../config/db.config');
const Classe = require('../models/classe');
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
			designation: req.body.designation
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
module.exports = {
	create,
	aff,
	modifier,
	supprimer
};
