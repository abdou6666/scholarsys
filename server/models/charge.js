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

// ,
// 		createdAt: {
// 			type: 'TIMESTAMP',
// 			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
// 			allowNull: false
// 		},
// 		updatedAt: {
// 			type: 'TIMESTAMP',
// 			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
// 			allowNull: false
// 		}
// 	},
// 	{
// 		timestamps: false
// 	}

//  *** matiere tale
// Matiere.hasMany(Seance);
// Seance.belongsTo(Matiere);

// Matiere.hasMany(Note);
// Note.belongsTo(Matiere);

module.exports = Charge;
