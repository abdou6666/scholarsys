require('dotenv').config();
const express = require('express');

const sequelize = require('./config/db.config');
const Token = require('./services/Token.service');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const errorHandler = require('./middlewares/errorHandler.middleware');
const isAuthenticated = require('./middlewares/isAuthenticated.middleware');
const verifyRole = require('./middlewares/isAuthorized.middleware');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/user', userRouter);
app.use(authRouter);

// test route for isAuthenticated middleware
app.get('/private', isAuthenticated, (req, res) => {
	return res.sendStatus(200);
});

// test route for revoking token for userId 1
app.get('/revoke', (_, res) => {
	Token.revokeRefreshTokens(1);
	res.send({ revoked: true });
});

// authorization & authentication works
app.get('/test', isAuthenticated, verifyRole('teacher', 'student'), (req, res) => {
	res.sendStatus(200);
});

app.use(errorHandler);

app.listen(PORT, async () => {
	try {
		// await sequelize.sync({ force: true });
		await sequelize.sync();
	} catch (err) {
		console.log(err);
	}
	console.log(`Listening on ${PORT}`);
});

module.exports = app;
