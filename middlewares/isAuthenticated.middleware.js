const jwt = require('jsonwebtoken');
const isAuthenticated = (req, res, next) => {
	try {
		const authorization = req.headers.authorization || req.headers.Authorization;
		if (!authorization) {
			throw new Error('not authenticated');
		}
		const token = authorization.split(' ')[1];
		const payload = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
		req.role = payload.role; //for the req.role based authorization
		next();
	} catch (err) {
		console.log(err);
		next(err);
	}
};

module.exports = isAuthenticated;
