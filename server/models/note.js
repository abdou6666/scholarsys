'use strict';
const Sequelize = require('sequelize');
const sequlize = require('../config/db.config');

const Note = sequlize.define(
	'note',
	{
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true
		},
		type: {
			type: Sequelize.STRING,
			allowNull: false
		},
		date_passage_examen: {
			type: Sequelize.DATE,
			allowNull: false
		},
		note_val: {
			type: Sequelize.DOUBLE,
			allowNull: false
		},
		coef_Note: {
			type: Sequelize.DOUBLE,
			allowNull: false
		}
	},
	{
		timestamps: true,
		createdAt: true,
		updatedAt: true
	}
);

module.exports = Note;
