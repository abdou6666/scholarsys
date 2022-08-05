const Sequelize = require('sequelize');
const sequilize = require('../../config/db.config');
const Seance = require('../Seance/Seance');
const User = require('../User/User');

const Emploi = sequilize.define(
	'emploi',
	{
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		}
		// createdAt: {
		// 	type: 'TIMESTAMP',
		// 	defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		// 	allowNull: false
		// },
		// updatedAt: {
		// 	type: 'TIMESTAMP',
		// 	defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
		// 	allowNull: false
		// }
	},
	{
		timestamps: false
	}
);

Emploi.hasMany(Seance);
Seance.belongsTo(Emploi);

// table emploi contains agentId created EMPLOI
// Emploi.belongsTo(User, {
// 	foreignKey: 'agentId'
// });

module.exports = Emploi;
