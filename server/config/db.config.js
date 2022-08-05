// db should be here
const Sequelize = require('sequelize');

const sequelize = new Sequelize('scholarsys', 'root', 'abdou', {
	dialect: 'mysql',
	host: 'localhost'
});
module.exports = sequelize;
