const Niveau = require('../models/niveau');
//const { response } = require('../server');

const count = (req, res, next) => {
	const NiveauCount =  Niveau.count((count)=>count)
    if (! NiveauCount){
        res.status(500).json({success:false})

    }
    
	NiveauCount.then(function(result) { res.send({
        count:result
    })});
}



const create = (req, res, next) => {
	Niveau.create(req.body)
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const aff = (req, res, next) => {
	Niveau.findAll()
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const modifier = (req, res, next) => {
	Niveau.update(
		{
			designation: req.body.designation,
			acronyme: req.body.acronyme,
			formationId: req.body.formationId
		},
		{ where: { id: req.params.id } }
	)
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const supprimer = (req, res, next) => {
	Niveau.destroy({ where: { id: req.params.id } })
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(500).send(err));
};
/*const FormationCount =  (req, res) => {
	//const count_Classe =  Classe.count({ col: 'Id', group: "niveauId",  })
	Niveau.findAndCountAll(
		{
			
			attributes: ['formationId' ],
			include: [
				{
					model: formation,
					attributes: [],
					include: [],
				    
				}
			],	
			group: ['formationId'],
			raw:true
			
		}
	).then(function (Form_Count) {
		res.send(Form_Count);
	});
}*/





module.exports = {
	create,
	aff,
	modifier,
	supprimer,
	count
	//FormationCount
	
	
};
