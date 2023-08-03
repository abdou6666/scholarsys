const Note = require('../models/note');
const { Sequelize, Op } = require("sequelize");
const count = (req, res, next) => {
	const NoteCount =  Note.count((count)=>count)
    if (! NoteCount){
        res.status(500).json({success:false})

    }
    
	NoteCount.then(function(result) { res.send({
        count:result
    })});
}


const create = (req, res, next) => {
	Note.create(req.body)
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
//Note.findAll({where:{ note_val:{ [Op.lt]: 10}}})
const aff = (req, res, next) => {
	Note.findAll()
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const modifier = (req, res, next) => {
	Note.update(
		{
			type: req.body.type,
            date_passage_examen:req.body.date_passage_examen,
			note_val:req.body.note_val,
			matiereId:req.body.matiereId,
			teacherId:req.body.teacherId
			
		},
		{ where: { id: req.params.id } }
	)
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(400).send(err));
};
const supprimer = (req, res, next) => {
	Note.destroy({ where: { id: req.params.id } })
		.then((response) => res.status(200).send(response))
		.catch((err) => res.status(500).send(err));
};
const MauvaiseMoy = (req, res, next) => {
	const MauvStat =  Note.count({where:{ note_val:{ [Op.lt]: 10}}});
    if (! MauvStat){
        res.status(500).json({success:false})

    }
    
	MauvStat.then(function(result) { res.send({
        count:result
    })});
}
const bonneMoy = (req, res, next) => {
	const BonnStat =  Note.count({where:{ note_val:{ [Op.gt]: 10}}});
    if (! BonnStat){
        res.status(500).json({success:false})

    }
    
	BonnStat.then(function(result) { res.send({
        count:result
    })});
}

module.exports = {
	create,
	aff,
	modifier,
	supprimer,
	count,
	MauvaiseMoy,
	bonneMoy
};
