'use strict';
const Sequelize = require('sequelize');
const sequlize = require('../config/db.config');
const Classe = require('./classe');
const Matiere = require('./matiere');

const Niveau = sequlize.define(
	'niveau',
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
		acronyme: {
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

Niveau.hasMany(Classe, {
	foreignKey: 'niveauId'
});
Classe.belongsTo(Niveau);

Niveau.hasMany(Matiere);
Matiere.belongsTo(Niveau);

module.exports = Niveau;
