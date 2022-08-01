'use strict';
const Sequelize = require('sequelize');
const sequlize = require('../config/db.config');

const Charge = sequlize.define('charge', {
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
	code_facture: {
		type: Sequelize.STRING,
		allowNull: false
	},
	montant_facture: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = Charge;
