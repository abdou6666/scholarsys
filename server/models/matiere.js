'use strict';
const Sequelize = require('sequelize');
const sequlize = require('../config/db.config');

const Note = require('./note');
const Seance = require('./Seance/Seance');
const Matiere = sequlize.define(
	'matiere',
	{
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true
		},
		designation: {
			type: Sequelize.STRING,
			allowNull: false
		},
		coef: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		nbr_heure: {
			type: Sequelize.INTEGER,
			allowNull: false
		}
	},
	{
		timestamps: false
	}
);
Matiere.hasMany(Note);
Note.belongsTo(Matiere);

Matiere.hasMany(Seance);
Seance.belongsTo(Matiere);
module.exports = Matiere;

// 'use strict';
// const Sequelize = require('sequelize');
// const sequlize = require('../config/db.config');

// const Matiere = sequlize.define('matiere', {
// 	id: {
// 		primaryKey: true,
// 		type: Sequelize.INTEGER,
// 		allowNull: false,
// 		autoIncrement: true
// 	},
// 	designation: {
// 		type: Sequelize.STRING,
// 		allowNull: false
// 	},
// 	code_facture: {
// 		type: Sequelize.STRING,
// 		allowNull: false
// 	},
// 	montant_facture: {
// 		type: Sequelize.INTEGER,
// 		allowNull: false
// 	}
// });
// module.exports = Matiere;
