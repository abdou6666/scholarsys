// module.exports = (sequelize, DataType) => {
// 	const classe = sequelize.define('classe', {
// 		nom: {
// 			type: DataType.STRING,
// 			allowNull: false
// 		},
// 		designation: {
// 			type: DataType.STRING,
// 			allowNull: false
// 		}
// 	});
// 	classe.associate = (models) => {
// 		classe.belongsTo(models.niveau);
// 	};
// 	return classe;
// };

('use strict');
const Sequelize = require('sequelize');
const sequlize = require('../config/db.config');
// const Niveau = require('./niveau');

const Classe = sequlize.define('classe', {
	id: {
		primaryKey: true,
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true
	},
	nom: {
		type: Sequelize.STRING,
		allowNull: false
	},
	designation: {
		type: Sequelize.STRING,
		allowNull: false
	}
});
// Classe.belongsTo(Niveau);

module.exports = Classe;
