const Sequelize = require('Sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db.config');
const User = require('../User/User');

// i want every seance (time +duration) + teacherId unique for that day in every emploi (check constraint or validate ???)
// create procedure ???
// create trigger when agent adds emploi it push old ones into new table history ??
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
			allowNull: false
		},
		start_minute: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		seance_duration: {
			type: Sequelize.INTEGER,
			allowNull: false
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
	},
	{
		timestamps: true,
		createdAt: true,
		updatedAt: true,
		hooks: {
			beforeCreate: async (record, options) => {
				// console.table({ record });
				// console.table({ options });
				const p = await sequelize.query('CALL test();');
			}
			// beforeUpdate: (record, options) => {
			// 	record.dataValues.updatedAt = new Date()
			// 		.toISOString()
			// 		.replace(/T/, ' ')
			// 		.replace(/\..+/g, '');
			// }
		}
		// TODO: check constraint instead
		/*indexes: [
			{
				unique: true,
				fields: [ 'start_hour', 'seance_duration', 'emploiId', 'teacherId' ]
			}
		] */
	}
);

module.exports = Seance;
