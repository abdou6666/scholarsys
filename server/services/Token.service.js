const jwt = require('jsonwebtoken');
const User = require('../models/User/User');

class Token {
	static createToken(user, options) {
		let secret;
		let expiresIn;
		let payload;
		if (
			!options.type ||
			[ 'access', 'refresh', 'email' ].indexOf(options.type.toLowerCase()) === -1
		) {
			throw new Error('Specify the right token type.');
		}
		if (options.type === 'access') {
			secret = process.env.SECRET_ACCESS_TOKEN;
			expiresIn = '15m';
			payload = { userId: user.id, role: user.role };
		}
		if (options.type === 'refresh') {
			secret = process.env.SECRET_REFRESH_TOKEN;
			payload = { userId: user.id, tokenVersion: user.tokenVersion };
			expiresIn = '7d';
		}
		if (options.type === 'email') {
			secret = process.env.EMAIL_SECRET;
			expiresIn = '30m';
			payload = { userId: user.id };
		}

		return jwt.sign(payload, secret, {
			expiresIn
		});
	}

	static async refreshToken(req, res) {
		const token = req.cookies.jid;

		if (!token) {
			return res.send({ ok: 'false', accessToken: '' });
		}
		let payload;
		let user;
		try {
			payload = jwt.verify(token, process.env.SECRET_REFRESH_TOKEN);
			user = await User.findByPk(payload.userId);
		} catch (err) {
			console.log(err);
			return res.send({ ok: 'false', accessToken: '' });
		}
		if (!user) {
			return res.send({ ok: 'false', accessToken: '' });
		}
		if (user.tokenVersion !== payload.tokenVersion) {
			return res.send({ ok: 'false', accessToken: '' });
		}

		const refreshToken = Token.createToken(user, { type: 'refresh' });
		Token.sendRefreshToken(res, refreshToken);

		return res.send({ ok: 'true', accessToken: Token.createToken(user, { type: 'access' }) });
	}

	static sendRefreshToken(res, token) {
		res.cookie('jid', token, {
			httpOnly: true
		});
	}

	static async revokeRefreshTokens(userId) {
		try {
			const updatedUser = await User.findByPk(userId);
			updatedUser.tokenVersion++;
			await updatedUser.save();
			//TODO : handle error cases
			console.log('revoked refresh token');
			return true;
		} catch (err) {
			console.log(err);
			next(err);
		}
	}
}

module.exports = Token;
