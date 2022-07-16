const Sequelize = require('sequelize');

const sequelize = new Sequelize('scholarSys', 'root', 'abdou', {
	dialect: 'mysql',
	host: 'localhost'
});
module.exports = sequelize;
