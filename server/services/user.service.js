const bcrpyt = require('bcrypt');
const User = require('../models/User/User');
const ErrorResponse = require('./../util/helpers/ErrorResponse');
const sendEmail = require('./email.service');
const { createToken } = require('./Token.service');

class UserService {
	static async findAll() {
		return await User.findAll();
	}
	static async create(newUser) {
		// TODO : Sanitize data

		// try {

		const hashedPassword = await bcrpyt.hash(newUser.password, 10);
		newUser.password = hashedPassword;
		try {
			const user = await User.create(newUser);
			console.log(hashedPassword);
			if (!user) {
				throw ErrorResponse.internalError('Error when creating the user');
				throw ErrorResponse.internalError('Error while creating the user');
			}

			const emailToken = createToken(user, { type: 'email' }); // throw error
			const body = `<h3> ${user.firstname} </h3> to confirm your account please click this link ${process
				.env.URL}/confirm/${emailToken}.<h1>This link will expire in 30m.</h1>`;

			await sendEmail(user.email, 'Confirm your account', body);
		} catch (err) {
			console.log(err);
			// console.log(err);
			throw ErrorResponse.internalError('Error when sending confirmation email');
		}

		// res.status(201).json({ message: `${user.firstname} created. confirm your email` });
		// } catch (err) {
		// 	res.status(400).json({ error: `Bad data.` });
		// }
	}
	static async findOne(id) {
		try {
			return await User.findByPk(id);
		} catch (err) {
			throw ErrorResponse.notFound('could not find the user');
		}
	}
	static async updateOne(id, updatedUser) {
		// TODO : Sanitize data
		// TODO: Sanitize data & make sure data is passed or keep old values
		try {
			return await User.update(updatedUser, {
				where: {
					id
				}
			});
		} catch (err) {
			throw ErrorResponse.internalError('Could not update this user');
		}
	}
	static async deleteOne(id) {
		try {
			return await User.destroy({
				where: {
					id: id
				}
			});
		} catch (err) {
			throw ErrorResponse.internalError('Could not delete this user');
		}
	}
}

module.exports = UserService;
