const Sequelize = require('Sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');
const User = require('../User/User');

const Seance = sequelize.define(
	'seance',
	{
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true
		},
		start_hour: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true
		},
		start_minute: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		seance_duration: {
			type: Sequelize.INTEGER,
			allowNull: false,
			unique: true
		},
		day: {
			type: DataTypes.ENUM(
				'lundi',
				'mardi',
				'mercredi',
				'jeudi',
				'vendredi',
				'samedi',
				'dimanche'
			),
			allowNull: false
		}
		// ,createdAt: {
		// 	type: DataTypes.DATE,
		// 	defaultValue: DataTypes.NOW
		// 	// allowNull: true //check if it adds correctly
		// },
		// updatedAt: {
		// 	type: DataTypes.DATE,
		// 	defaultValue: DataTypes.NOW
		// 	// allowNull: true //check if it adds correctly
		// }
	},
	{
		timestamps: false,
		indexes: [
			{
				unique: true,
				fields: [ 'start_hour', 'seance_duration', 'emploiId' ]
			}
		]
	}
);

// Seance.belongsTo(User, {
// 	foreignKey: 'agentId'
// });
// Seance.belongsTo(User, {
// 	foreignKey: 'teacherId'
// });
module.exports = Seance;
