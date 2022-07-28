const { body, check } = require('express-validator');
const createUserSchema = [
	body('email').isEmail().withMessage('email must contain a valid email address'),
	body('password').isLength({ min: 8 }).withMessage('password must be at least 8 characters long')
];

const updateUserSchema = [
	body('email').isEmail().withMessage('email must contain a valid email address'),
	body('password').isLength({ min: 8 }).withMessage('password must be at least 5 characters long')
];

const userSchema = {
	createUserSchema,
	updateUserSchema
};

module.exports = userSchema;
