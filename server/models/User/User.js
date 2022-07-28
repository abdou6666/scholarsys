const Sequelize = require('sequelize');
const sequlize = require('../../config/db.config');
// const joi = require('joi');

const User = sequlize.define('user', {
	id: {
		primaryKey: true,
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true
	},
	// firstname: {
	// 	type: Sequelize.STRING,
	// 	allowNull: false
	// },
	// lastname: {
	// 	type: Sequelize.STRING,
	// 	allowNull: false
	// },
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	// phoneNumber: {
	// 	type: Sequelize.STRING,
	// 	allowNull: false
	// },
	// birthDate: {
	// 	type: Sequelize.DATEONLY,
	// 	allowNull: false
	// },
	confirmed: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	tokenVersion: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	},
	role: {
		type: Sequelize.INTEGER,
		defaultValue: 1,
		allowNull: false
	}
});

module.exports = User;
