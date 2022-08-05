const Sequelize = require('sequelize');
const sequlize = require('../../config/db.config');
const Classe = require('../classe');
const Emploi = require('../Emploi/Emploi');
const Seance = require('../Seance/Seance');
// const joi = require('joi');

const User = sequlize.define(
	'user',
	{
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true
		},
		firstname: {
			type: Sequelize.STRING,
			allowNull: false
		},
		lastname: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		image: {
			type: Sequelize.STRING,
			allowNull: true
		},
		phoneNumber: {
			type: Sequelize.STRING,
			allowNull: false
		},
		birthDate: {
			type: Sequelize.DATEONLY,
			allowNull: false
		},
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
		},
		salaire: {
			type: Sequelize.DOUBLE,
			allowNull: true
		},
		createdAt: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			allowNull: false
		},
		updatedAt: {
			type: 'TIMESTAMP',
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
			allowNull: false
		}
	},
	{
		timestamps: false
	}
);
//prof has many seance
User.hasMany(Seance, {
	foreignKey: 'teacherId'
});

//seance belongs to prof
Seance.belongsTo(User, {
	foreignKey: 'teacherId'
});

//seance belongs to agent
Seance.belongsTo(User, {
	foreignKey: 'agentId'
});

// agent
User.hasMany(Emploi, {
	foreignKey: 'agentId'
});

// table emploi contains agentId created EMPLOI
Emploi.belongsTo(User, {
	foreignKey: 'agentId'
});

// could cause probs
User.hasMany(Seance, {
	foreignKey: 'agentId'
});

User.hasOne(Seance, {
	foreignKey: 'teacherId'
});
User.hasMany(Classe, {
	foreignKey: 'teacherId'
});
User.hasOne(Classe, {
	foreignKey: 'studentId'
});
module.exports = User;
