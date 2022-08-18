'use strict';
const Sequelize = require('sequelize');
const sequlize = require('../config/db.config');
const Niveau = require('./niveau');

const Formation = sequlize.define(
	'formation',
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
		montant_anuelle: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		duree_anuelle: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		duree_mensuelle: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		date_echeance: {
			type: Sequelize.DATE,
			allowNull: false
		}
	},
	{
		timestamps: true,
		createdAt: true,
		updatedAt: true
	}
);

Formation.hasMany(Niveau, {
	foreignKey: 'formationId'
});
Niveau.belongsTo(Formation);
module.exports = Formation;
