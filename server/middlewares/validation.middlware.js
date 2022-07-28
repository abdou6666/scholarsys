const { validationResult } = require('express-validator');
function validateRequestSchema(req, res, next) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const errArray = {
			type: 'validation',
			errors: errors.array()
		};
		next(errArray);
	}
	next();
}

module.exports = validateRequestSchema;
