/*'use strict';
const Sequelize = require('sequelize');
const sequlize = require('../config/db.config');
const Note = require('./note');

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
		timestamps: true,
		createdAt: true,
		updatedAt: true
	}
);
Matiere.hasMany(Note);
Note.belongsTo(Matiere);


module.exports = Matiere;*/
'use strict';
const Sequelize = require('sequelize');
const sequlize = require('../config/db.config');
const Note = require('./note');

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
		timestamps: true,
		createdAt: true,
		updatedAt: true
	}
);
Matiere.hasMany(Note);
Note.belongsTo(Matiere);
module.exports = Matiere;
