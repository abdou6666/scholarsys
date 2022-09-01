// db should be here
const Sequelize = require('sequelize');

const sequelize = new Sequelize('scholarsys', 'root', '', {
	// logging: false,
	dialect: 'mysql',
	host: 'localhost'
});
module.exports = sequelize;
