const User = require('../models/User/User');
const bcrpyt = require('bcrypt');
const Token = require('./Token.service');
const ErrorResponse = require('../util/helpers/ErrorResponse');
const sendEmail = require('./email.service');
const jwt = require('jsonwebtoken');

// TODO : Shouldn't return response
class AuthService {
	static async login(email, password) {
		// TODO : handle this in the router express-validator
		if (!email || !password) {
			throw ErrorResponse.badRequest('Email and password are required.');
		}
		const user = await User.findOne({
			where: {
				email
			}
		});
		if (!user) {
			throw ErrorResponse.notFound();
		}

		if (!user.confirmed) {
			throw ErrorResponse.forbidden('Please confirm your account!');
		}
		const isValid = await bcrpyt.compare(password, user.password);
		if (!isValid) {
			throw ErrorResponse.badRequest('Your credentials are wrong');
		}

		// logged in successful
		const accessToken = Token.createToken(user, { type: 'access' });
		const refreshToken = Token.createToken(user, { type: 'refresh' });
		return [ accessToken, refreshToken ];
	}
	static async confirm(token) {
		const payload = jwt.verify(token, process.env.EMAIL_SECRET);

		if (!payload) {
			throw ErrorResponse.badRequest('missing some data');
		}
		const user = await User.findByPk(payload.userId);
		if (!user) {
			throw ErrorResponse.notFound('User not found');
		}
		user.confirmed = true;
		await user.save();
	}
	static async resetPassword(email) {
		const user = await User.findOne({
			where: { email }
		});
		if (!user) {
			throw ErrorResponse.notFound('user not found');
		}
		Token.revokeRefreshTokens(user.id); // could throw error
		const token = Token.createToken(user, { type: 'email' }); // could throw error
		const body = `click this link to reset your password this link expires in 30m.\n${process
			.env.URL}/reset_password/${token}`;
		sendEmail(email, 'Reset Password', body); // could throw an error
	}
	static async changePassword(token, password) {
		const payload = jwt.verify(token, process.env.EMAIL_SECRET);
		const user = await User.findByPk(payload.userId);
		user.password = await bcrpyt.hash(password, 10);
		await user.save();
	}
}

module.exports = AuthService;
