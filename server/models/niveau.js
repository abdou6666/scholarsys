// module.exports = (sequelize, DataType) => {
// 	const niveau = sequelize.define('niveau', {
// 		designation: {
// 			type: DataType.STRING,
// 			allowNull: false
// 		},
// 		acronyme: {
// 			type: DataType.STRING,
// 			allowNull: false
// 		}
// 	});
// 	niveau.associate = (models) => {
// 		niveau.hasMany(models.classe);
// 		// niveau.belongsTo(models.formation)
// 		niveau.belongsTo(models.formation, {
// 			foreignKey: 'formationId',
// 			as: 'formation'
// 		});
// 	};
// 	return niveau;
// };

// }
'use strict';
const Sequelize = require('sequelize');
const sequlize = require('../config/db.config');
const Classe = require('./classe');

const Niveau = sequlize.define(
	'niveau',
	{
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
		acronyme: {
			type: Sequelize.STRING,
			allowNull: false
		}
	},
	{
		timestamps: true,
		createdAt: true,
		updatedAt: true
	}
);

Niveau.hasMany(Classe, {
	foreignKey: 'niveauId'
});
Classe.belongsTo(Niveau);

module.exports = Niveau;
