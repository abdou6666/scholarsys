const jwt = require('jsonwebtoken');
const ErrorResponse = require('../util/helpers/ErrorResponse');
const roles = new Map();
roles.set('admin', 1999);
roles.set('agent', 987);
roles.set('teacher', 666);
roles.set('student', 1);

const verifyRole = (...allowedRoles) => {
	//  * Implementation getting user role  from jwt *
	return (req, res, next) => {
		const authorization = req.headers.authorization || req.headers.Authorization;

		try {
			if (!authorization) {
				throw ErrorResponse.unauthorized();
				// next(err)
			}
			const token = authorization.split(' ')[1];
			const payload = jwt.verify(token, process.env.SECRET_ACCESS_TOKEN);

			if (!payload.role) {
				throw new Error('role is missing');
			}
			const rolesArray = [ ...allowedRoles ];
			const result = rolesArray
				.map((role) => roles.get(role) === payload.role)
				.find((val) => val === true);
			if (!result) {
				throw ErrorResponse.unauthorized();
			}
			next();
		} catch (err) {
			next(err);
		}
		next();
	};
	// * Implementation getting user role from req*
	// return (req, res, next) => {
	// 	try {
	// 		if (!req.role) {
	// 			throw Error('role is missing');
	// 		}
	// 		const rolesArray = [ ...allowedRoles ];
	// 		const result = rolesArray
	// 			.map((role) => roles.get(role) === req.role)
	// 			.find((val) => val === true);
	// 		if (!result) {
	// 			throw new Error('not authorized');
	// 		}
	// 		next();
	// 	} catch (err) {
	// 		console.log(err);
	// 		next(err);
	// 	}
	// };
};

module.exports = verifyRole;
