const Note = require('../models/note');
const Matiere = require('../models/matiere');
const { Sequelize, Op } = require('sequelize');
const { response } = require('../server');

const count = (req, res, next) => {
	const NoteCount = Note.count((count) => count);
	if (!NoteCount) {
		res.status(500).json({ success: false });
	}

	NoteCount.then(function(result) {
		res.send({
			count: result
		});
	});
};

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
			date_passage_examen: req.body.date_passage_examen,
			note_val: req.body.note_val,
			matiereId: req.body.matiereId,
			teacherId: req.body.teacherId
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
	const MauvStat = Note.count({ where: { note_val: { [Op.lt]: 10 } } });
	if (!MauvStat) {
		res.status(500).json({ success: false });
	}

	MauvStat.then(function(result) {
		res.send({
			count: result
		});
	});
};
const bonneMoy = (req, res, next) => {
	const BonnStat = Note.count({ where: { note_val: { [Op.gt]: 10 } } });
	if (!BonnStat) {
		res.status(500).json({ success: false });
	}

	BonnStat.then(function(result) {
		res.send({});
	});
};
const Moyenne = (req, res, next) => {
	console.log('aa');

	const moy = Note.findAll({
		where: { studentId: req.query.studentId },
		attributes: [ 'note_val', 'coef_Note', 'Matiere.coef' ],
		include: [
			{
				model: Matiere,
				attributes: [ 'coef', 'id' ] // empty this out
			}
		]
	});

	var aux = 0;
	moy.then((data) => {
		var aux = 0;
		const matieresMap = new Map();
		data.forEach((result) => {
			/*let aux =  Matiere.findAll(
			{where:{id: result.matiereId}})
			.then(resultMatiere => resultMatiere[0].coef * result.note_val * result.coef_Note);
			})*/
			//let parsedData = JSON.parse(result)
			matieresMap.set(result.matiere.id, result.matiere.coef);
			aux += result.matiere.coef * result.note_val * result.coef_Note;
		});
		let coeffs = 0;
		matieresMap.forEach((value) => {
			coeffs += value;
		});
		console.log(aux / coeffs);
		moyRes = {
			moyenne: aux / coeffs
		};
		res.json(moyRes);
		res.end();
		moy.then((response) => res.status(200).send(moyRes));
	});
	return;
};
const MoyenneParam = async (studentId) => {
	//console.log ("aa")

	const moy = Note.findAll({
		where: { studentId: studentId },
		attributes: [ 'note_val', 'coef_Note', 'Matiere.coef' ],
		include: [
			{
				model: Matiere,
				attributes: [ 'coef', 'id' ] // empty this out
			}
		]
	});

	let coeffs;
	let aux;
	let arr;

	async function calculM() {
		return await moy.then((data) => {
			// console.log(data)
			aux = 0;
			// var aux = 0
			const matieresMap = new Map();
			data.forEach((result) => {
				/*let aux =  Matiere.findAll(
					{where:{id: result.matiereId}})
					.then(resultMatiere => resultMatiere[0].coef * result.note_val * result.coef_Note);
					})*/
				//let parsedData = JSON.parse(result)
				matieresMap.set(result.matiere.id, result.matiere.coef);
				aux += result.matiere.coef * result.note_val * result.coef_Note;

				//console.log(data)
			});
			coeffs = 0;
			let t = [];
			matieresMap.forEach((value) => {
				// console.log({value})

				coeffs += value;
				const moyenne = aux / coeffs;

				// arr.push({studentId,moyenne})
				t.push({ studentId, moyenne });

				// arr.push({studentId,moyenne })
				// arr = [...arr,{studentId,moyenne}]
				// console.log("nested arr in  ",arr)
			});

			return t;
			//   console.log("ttttttttttttttttt " ,t)
			//   arr = t;
			//   return t;

			//moyRes = {

			//res.json(moyRes)
			//res.json(moyRes)
			//res.end()
			//moy.then((response) => res.status(200).send(moyRes))
			//return aux / coeffs
		});
	}
	arr = await calculM();

	return arr;

	// return
};
const MoyenneParam_sup10 = async (studentId) => {
	//console.log ("aa")

	const moy = Note.findAll({
		where: { studentId: studentId },
		attributes: [ 'note_val', 'coef_Note', 'Matiere.coef' ],
		include: [
			{
				model: Matiere,
				attributes: [ 'coef', 'id' ] // empty this out
			}
		]
	});

	let coeffs;
	let aux;
	let arr;

	async function calculM() {
		return await moy.then((data) => {
			// console.log(data)
			aux = 0;
			// var aux = 0
			const matieresMap = new Map();
			data.forEach((result) => {
				/*let aux =  Matiere.findAll(
					{where:{id: result.matiereId}})
					.then(resultMatiere => resultMatiere[0].coef * result.note_val * result.coef_Note);
					})*/
				//let parsedData = JSON.parse(result)
				matieresMap.set(result.matiere.id, result.matiere.coef);
				aux += result.matiere.coef * result.note_val * result.coef_Note;

				//console.log(data)
			});
			coeffs = 0;
			let t = [];
			matieresMap.forEach((value) => {
				// console.log({value})

				coeffs += value;
				const moyenne = aux / coeffs;

				// arr.push({studentId,moyenne})
				if (moyenne > 10)
					t.push({ studentId, moyenne });

				// arr.push({studentId,moyenne })
				// arr = [...arr,{studentId,moyenne}]
				// console.log("nested arr in  ",arr)
			});
             return t 
			//return length (t);
			//   console.log("ttttttttttttttttt " ,t)
			//   arr = t;
			//   return t;

			//moyRes = {

			//res.json(moyRes)
			//res.json(moyRes)
			//res.end()
			//moy.then((response) => res.status(200).send(moyRes))
			//return aux / coeffs
		});
	}
	arr = await calculM();

	return arr;

	// return
};
const MoyenneParam_inf10 = async (studentId) => {
	//console.log ("aa")

	const moy = Note.findAll({
		where: { studentId: studentId },
		attributes: [ 'note_val', 'coef_Note', 'Matiere.coef' ],
		include: [
			{
				model: Matiere,
				attributes: [ 'coef', 'id' ] // empty this out
			}
		]
	});

	let coeffs;
	let aux;
	let arr;

	async function calculM() {
		return await moy.then((data) => {
			// console.log(data)
			aux = 0;
			// var aux = 0
			const matieresMap = new Map();
			data.forEach((result) => {
				/*let aux =  Matiere.findAll(
					{where:{id: result.matiereId}})
					.then(resultMatiere => resultMatiere[0].coef * result.note_val * result.coef_Note);
					})*/
				//let parsedData = JSON.parse(result)
				matieresMap.set(result.matiere.id, result.matiere.coef);
				aux += result.matiere.coef * result.note_val * result.coef_Note;

				//console.log(data)
			});
			coeffs = 0;
			let t = [];
			matieresMap.forEach((value) => {
				// console.log({value})

				coeffs += value;
				const moyenne = aux / coeffs;

				// arr.push({studentId,moyenne})
				if (moyenne < 10)
					t.push({ studentId, moyenne });

				// arr.push({studentId,moyenne })
				// arr = [...arr,{studentId,moyenne}]
				// console.log("nested arr in  ",arr)
			});

			return t;
			//   console.log("ttttttttttttttttt " ,t)
			//   arr = t;
			//   return t;

			//moyRes = {

			//res.json(moyRes)
			//res.json(moyRes)
			//res.end()
			//moy.then((response) => res.status(200).send(moyRes))
			//return aux / coeffs
		});
	}
	arr = await calculM();

	return arr;
}
const statMoy = async (req, res, next) => {
	const statMoy = await Note.findAll({
		attributes: [
			[ Sequelize.fn('DISTINCT', Sequelize.col('studentId')), 'studentId' ],
			'matiereId'
		]
	});

	const arryObj = statMoy.map(async (result) => {
		return await MoyenneParam(result.studentId);
	});
	const data = await await Promise.all(arryObj);

	return res.status(200).json(JSON.stringify(data));
};
const BstatMoy = async (req, res, next) => {
	const statMoy = await Note.findAll({
		attributes: [
			[ Sequelize.fn('DISTINCT', Sequelize.col('studentId')), 'studentId' ],
			'matiereId'
		]
	});

	const arryObj = statMoy.map(async (result) => {
		return await MoyenneParam_sup10(result.studentId);
	});
	const data = await await Promise.all(arryObj);
	const newArray = data.map(element => {

		if(element.length === 0)
		return
		return element
		
		});

		let i = 0;
        newArray.forEach(el => {
          if(el !== undefined)
            i++;
});

	return res.status(200).json(JSON.stringify({moyenneSup:i}));
}
const MstatMoy = async (req, res, next) => {
	const statMoy = await Note.findAll({
		attributes: [
			[ Sequelize.fn('DISTINCT', Sequelize.col('studentId')), 'studentId' ],
			'matiereId'
		]
	});

	const arryObj = statMoy.map(async (result) => {
		return await MoyenneParam_inf10(result.studentId);
	});
	const data = await await Promise.all(arryObj);
	//console.log(data)
	const newArray = data.map(element => {

		if(element.length === 0)
		return
		return element
		
		});

		let i = 0;
        newArray.forEach(el => {
          if(el !== undefined)
            i++;
});
	
		
		
	
	return res.status(200).json(JSON.stringify ({moyenneInf:i}));
	
}

module.exports = {
	create,
	aff,
	modifier,
	supprimer,
	count,
	MauvaiseMoy,
	bonneMoy,
	Moyenne,
	MoyenneParam,
	statMoy,
	BstatMoy,
	MstatMoy
};