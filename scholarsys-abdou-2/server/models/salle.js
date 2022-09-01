'use strict';
const Sequelize = require('sequelize');
const sequlize = require('../config/db.config');
const Seance = require('./Seance/Seance');

const Salle = sequlize.define(
	'salle',
	{
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true
		},
		designation: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		}
	},
	{
		timestamps: true,
		createdAt: true,
		updatedAt: true
	}
);
Salle.hasMany(Seance);
Seance.belongsTo(Salle);

module.exports = Salle;
