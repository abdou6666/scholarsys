const Salle = require('../models/salle');

const create = async (req, res, next) => {
	const { designation } = req.body;
	try {
		await Salle.create({ designation });
		return res.sendStatus(200);
	} catch (err) {
		console.log(err);
		return res.sendStatus(409);
	}
};
const aff = (req, res, next) => {
	Salle.findAll()
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const modifier = (req, res, next) => {
	Salle.update(
		{
			designation: req.body.designation
		},
		{ where: { id: req.params.id } }
	)
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const supprimer = (req, res, next) => {
	Salle.destroy({ where: { id: req.params.id } })
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(500).send(err));
};
module.exports = {
	create,
	aff,
	modifier,
	supprimer
};
