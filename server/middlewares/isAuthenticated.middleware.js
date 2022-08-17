const jwt = require('jsonwebtoken');
const ErrorResponse = require('../util/helpers/ErrorResponse');
const isAuthenticated = (req, res, next) => {
	try {
		const authorization = req.headers.authorization || req.headers.Authorization;
		if (!authorization) {
			throw ErrorResponse.unauthorized();
		}
		const token = authorization.split(' ')[1];
		const payload = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);
		if (!payload.role) {
			throw ErrorResponse.unauthorized();
		}
		req.role = payload.role; //for the req.role based authorization
		req.userId = payload.userId;
		next();
	} catch (err) {
		// console.log(err);
		next(err);
	}
};

module.exports = isAuthenticated;
