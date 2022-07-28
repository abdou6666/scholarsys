// db should be here
const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
// 	process.env.DATABASE_NAME,
// 	process.env.DATABASE_USER_ACCOUNT,
// 	process.env.DATABASE_PASSWORD,
// 	{
// 		dialect: 'mysql',
// 		host: 'localhost'
// 	}
// );
const sequelize = new Sequelize('scholarsys', 'root', 'abdou', {
	dialect: 'mysql',
	host: 'localhost'
});
module.exports = sequelize;
