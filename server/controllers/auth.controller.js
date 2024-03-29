const AuthService = require('../services/auth.service');
const ErrorResponse = require('../util/helpers/ErrorResponse');
class AuthController {
	static login = async (req, res, next) => {
		const { email, password } = req.body;
		// TODO: validate email password with validator
		try {
			const [ accessToken, refreshToken ] = await AuthService.login(email, password);
			res.cookie('jid', refreshToken, {
				httpOnly: true
				//	secure: true,
			});
			return res.status(200).json({ accessToken });
		} catch (err) {
			next(err);
		}
	};
	static logout(_, res, next) {
		res.clearCookie('jid');

		return res.status(200).json({ success: true, message: 'logged out' });
	}
	static async confirmAccount(req, re, next) {
		const token = req.params.token;
		if (!token) {
			throw ErrorResponse.badRequest('Invalide url');
		}
		try {
			await AuthService.confirm(token);
			return res.status(200).json({ message: 'user confirmed' });
			// TODO : redirect instead to login page
		} catch (err) {
			next(err);
		}
	}
	static resetPassword = async (req, res, next) => {
		const { email } = req.body;
		try {
			await AuthService.resetPassword(email);
			return res.status(200).json({ message: 'email has been sent to reset your password' });
		} catch (err) {
			next(err);
		}
	};

	static changePassword = async (req, res, next) => {
		const { password, confirmPassword } = req.body;
		const token = req.params.token;
		if (password !== confirmPassword) {
			throw ErrorResponse.badRequest('password and confirm password needs to be same');
		}
		try {
			if (!token) {
				throw ErrorResponse.badRequest('token missing');
			}
			await AuthService.changePassword(token, password);
			return res.status(200).json({ success: true, message: 'password changed' });

			//redirect to login
		} catch (err) {
			next(err);
		}
	};
}

module.exports = AuthController;
