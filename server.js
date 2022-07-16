const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const sequelize = require('./util/database');

app.use(express.json());
app.listen(PORT, async () => {
	await sequelize.sync();
	console.log(`Listening on ${PORT}`);
});
