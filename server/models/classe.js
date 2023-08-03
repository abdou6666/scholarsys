('use strict');
const Sequelize = require('sequelize');
const sequlize = require('../config/db.config');
// const Niveau = require('./niveau');

const Classe = sequlize.define(
	'classe',
	{
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true
		},
		nom: {
			type: Sequelize.STRING,
			allowNull: false
		},
		designation: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	{
		timestamps: true,
		createdAt: true,
		updatedAt: true
	}
);
// Classe.belongsTo(Niveau);

module.exports = Classe;
