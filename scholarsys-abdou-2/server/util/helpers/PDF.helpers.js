const Classe = require('../../models/classe');
const ErrorResponse = require('./ErrorResponse');
const path = require('path');
const sequelize = require('../../config/db.config');
const puppeteer = require('puppeteer');
const ejs = require('ejs');
const { Op } = require('sequelize');
const User = require('../../models/User/User');
const { convertTime, calculateSeanceTime } = require('./helpers.util');
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
	const classesId = await Classe.findAll();

	const preparedQueries = classesId.map((classe) => {
		return `select m.designation                            as                  matiere,
      			start_minute,
	   			seance_duration,
	  			start_hour,
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
			const input = {
				startHour: parseInt(s.start_hour),
				startMinute: parseInt(s.start_minute)
			};

			const inputTime = calculateSeanceTime(input, s.seance_duration);
			const convertedInput = convertTime(inputTime);

			let convertedStartTime = convertedInput.startTime.toString().replace('.', 'h:');
			let convertedEndTime = convertedInput.endTime.toString().replace('.', 'h:');

			if (convertedStartTime.length === 5) {
				convertedStartTime += '0';
			}

			if (convertedEndTime.length === 5) {
				convertedEndTime += '0';
			}
			s.startTime = convertedStartTime;
			s.finishTime = convertedEndTime;

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
       start_minute,
	   seance_duration,
	   start_hour,
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

	try {
		preparedQueriesTeachers.forEach(async (query) => {
			let emploiName;
			const [ seances ] = await sequelize.query(query);
			const obj = {
				lundi: [],
				mardi: [],
				mercredi: [],
				jeudi: [],
				vendredi: [],
				samedi: []
			};
			seances.forEach((s) => {
				const input = {
					startHour: parseInt(s.start_hour),
					startMinute: parseInt(s.start_minute)
				};

				const inputTime = calculateSeanceTime(input, s.seance_duration);
				const convertedInput = convertTime(inputTime);

				let convertedStartTime = convertedInput.startTime.toString().replace('.', 'h:');
				let convertedEndTime = convertedInput.endTime.toString().replace('.', 'h:');

				if (convertedStartTime.length === 5) {
					convertedStartTime += '0';
				}

				if (convertedEndTime.length === 5) {
					convertedEndTime += '0';
				}
				s.startTime = convertedStartTime;
				s.finishTime = convertedEndTime;

				emploiName = s.name;
				if (s.day === 'lundi') obj.lundi.push(s);
				if (s.day === 'mardi') obj.mardi.push(s);
				if (s.day === 'mercredi') obj.mercredi.push(s);
				if (s.day === 'jeudi') obj.jeudi.push(s);
				if (s.day === 'vendredi') obj.vendredi.push(s);
				if (s.day === 'samedi') obj.samedi.push(s);
			});
			generatePDF(obj, emploiName, folderName.teachers);
		});
	} catch (error) {
		throw ErrorResponse.internalError(error.message);
	}
}

module.exports = createEmplois;
