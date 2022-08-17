const Classe = require('../../models/classe');
const ErrorResponse = require('./ErrorResponse');
const path = require('path');
const sequelize = require('../../config/db.config');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const { Op } = require('sequelize');
const User = require('../../models/User/User');
const folderName = {
	teachers: 'teachers',
	students: 'students'
};
const compile = async function(seances) {
	const filePath = path.join(__dirname, 'pdf_template.ejs');
	return await ejs.renderFile(filePath, { seances });
};
const generatePDF = async (obj, name, folderName) => {
	const filePath = path.join(
		__dirname,
		'..',
		'..',
		'public',
		'emploi',
		folderName,
		`${name}.pdf`
	);
	try {
		const browser = await puppeteer.launch();

		const page = await browser.newPage();

		const content = await compile(obj);

		await page.setContent(content);

		await page.pdf({
			path: filePath,
			format: 'A4',
			printBackground: true
		});

		await browser.close();
	} catch (e) {
		throw ErrorResponse.internalError();
	}
};

async function createEmplois() {
	// students emplois
	const classesId = await Classe.findAll();

	const preparedQueries = classesId.map((classe) => {
		return `select m.designation                            as                  matiere,
		       concat(s.start_hour, 'h:', s.start_minute) as                  startTime,
		       concat(s.start_hour + s.seance_duration *0.01, 'h:', s.start_minute) finishTime,
		       s2.designation                           as                  salle,
		       e.name                                   as                  'title',
		       s.day,
			   e.name
		from emplois e
		         join seances s on e.id = s.emploiId
		         join salles s2 on s.salleId = s2.id
		         join matieres m on s.matiereId = m.id
		where e.classeId = ${classe.id}
		order by s.day , s.start_hour`;
	});

	preparedQueries.forEach(async (query) => {
		const [ seances ] = await sequelize.query(query);
		const emploiName = seances[0].name.trim().replace(' ', '_');
		const obj = {
			emploiName,
			lundi: [],
			mardi: [],
			mercredi: [],
			jeudi: [],
			vendredi: [],
			samedi: []
		};
		seances.forEach((s) => {
			if (s.day === 'lundi') obj.lundi.push(s);
			if (s.day === 'mardi') obj.mardi.push(s);
			if (s.day === 'mercredi') obj.mercredi.push(s);
			if (s.day === 'jeudi') obj.jeudi.push(s);
			if (s.day === 'vendredi') obj.vendredi.push(s);
			if (s.day === 'samedi') obj.samedi.push(s);
		});
		generatePDF(obj, emploiName, folderName.students);
	});

	// TODO : i need to get only teachers id that have classesId
	const teachers = await User.findAll({
		attributes: [ 'specificData', 'id' ],
		where: {
			[Op.and]: [ { role: 666 }, { specificData: { [Op.not]: null } } ]
		}
	});

	const teachersId = teachers.map((teacher) => {
		const obj = JSON.parse(teacher.specificData);

		if (obj.classesId.length !== 0) return teacher.id;
	});

	const preparedQueriesTeachers = teachersId.map((id) => {
		return `select m.designation                            as                  matiere,
       concat(s.start_hour, 'h:', start_minute) as                  startTime,
       concat(s.start_hour + s.seance_duration, 'h:', start_minute) finishTime,
       s2.designation                           as                  salle,
       u.firstname,
       s.day,
       concat('emploi_',u.firstname,'_',u.lastname) as name

from emplois e
         join seances s on e.id = s.emploiId
         join users u on s.teacherId = u.id
         join salles s2 on s.salleId = s2.id
         join matieres m on s.matiereId = m.id

where s.teacherId = ${id}`;
	});
	console.log(preparedQueriesTeachers);

	try {
		preparedQueriesTeachers.forEach(async (query) => {
			const [ seances ] = await sequelize.query(query);

			const emploiName = `teacher_${Date.now()}`;
			const obj = {
				emploiName,
				lundi: [],
				mardi: [],
				mercredi: [],
				jeudi: [],
				vendredi: [],
				samedi: []
			};
			seances.forEach((s, index) => {
				if (index === 0) obj.name = s.name;
				if (s.day === 'lundi') obj.lundi.push(s);
				if (s.day === 'mardi') obj.mardi.push(s);
				if (s.day === 'mercredi') obj.mercredi.push(s);
				if (s.day === 'jeudi') obj.jeudi.push(s);
				if (s.day === 'vendredi') obj.vendredi.push(s);
				if (s.day === 'samedi') obj.samedi.push(s);
			});

			generatePDF(obj, obj.name, folderName.teachers);
		});
	} catch (error) {
		console.log(error);
	}
}

module.exports = createEmplois;
