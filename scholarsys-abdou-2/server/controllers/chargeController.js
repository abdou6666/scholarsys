const Charge = require('../models/charge');

const create = async (req, res, next) => {
	Charge.create(req.body)
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const aff = async (req, res, next) => {
	Charge.findAll()
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const modifier = (req, res, next) => {
	Charge.update(
		{
			designation: req.body.designation,
			code_facture: req.body.code_facture,
			montant_facture: req.body.montant_facture,
			date_ajout: req.body.date_ajout
		},
		{ where: { id: req.params.id } }
	)
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const supprimer = (req, res, next) => {
	Charge.destroy({ where: { id: req.params.id } })
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(500).send(err));
};
module.exports = {
	create,
	aff,
	modifier,
	supprimer
};
