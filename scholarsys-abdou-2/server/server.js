require('dotenv').config();
const express = require('express');
const cluster = require('cluster');
const { cpus } = require('os');

const sequelize = require('./config/db.config');

const Token = require('./services/Token.service');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const seanceRouter = require('./routes/seanceRouter');
const emploiRouter = require('./routes/emploiRouter');
const attendanceRouter = require('./routes/attendanceRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const errorHandler = require('./middlewares/errorHandler.middleware');
const isAuthenticated = require('./middlewares/isAuthenticated.middleware');
const verifyRole = require('./middlewares/isAuthorized.middleware');

const niveauRouter = require('./routes/niveau-routes');
const classeRouter = require('./routes/classe-routes');
const formationRouter = require('./routes/formation-routes');
const chargeRouter = require('./routes/charge-routes');
const salleRouter = require('./routes/salle-routes');
const matiereRouter = require('./routes/matiere-routes');
const noteRouter = require('./routes/note-routes');
const path = require('path');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(authRouter);
app.use('/user', userRouter);
app.use('/seance', seanceRouter);
app.use('/emploi', emploiRouter);
app.use('/attendance', attendanceRouter);

app.use('/', niveauRouter);
app.use('/', classeRouter);
app.use('/', formationRouter);
app.use('/', chargeRouter);
app.use('/', salleRouter);
app.use('/', matiereRouter);
app.use('/', noteRouter);

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

app.get('/proc', async (req, res, next) => {
	try {
		// testing fn
		const p = await sequelize.query('CALL test();');

		return res.json(p);
	} catch (error) {
		console.log(error);
	}
});

if (cluster.isMaster) {
	const cpuCount = cpus().length;

	for (let i = 0; i < cpuCount; i++) {
		console.log(process.pid);
		cluster.fork();
	}

	cluster.on('exit', () => {
		cluster.fork();
	});
} else {
	app.listen(PORT, async () => {
		try {
			//await sequelize.sync({ force: true });
			// await sequelize.sync();
		} catch (err) {
			console.log(err);
		}
		console.log(`Listening on ${PORT} | ${process.pid}`);
	});
}
module.exports = app;
