'use strict';
const Sequelize = require('sequelize');
const sequlize = require('../config/db.config');

const Salle = sequlize.define('salle', {
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
});

module.exports = Salle;
