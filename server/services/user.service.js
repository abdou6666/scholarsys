const bcrpyt = require('bcrypt');
const User = require('../models/User/User');
const ErrorResponse = require('./../util/helpers/ErrorResponse');
const sendEmail = require('./email.service');
const { createToken } = require('./Token.service');
const path = require('path');
const crypto = require('crypto');
class UserService {
	static async findAll(option) {
		if (!option)
			return await User.findAll({
				attributes: { exclude: [ 'password' ] }
			});
		if (option.teachers) {
			return await User.findAll({
				where: {
					role: 666
				},
				attributes: { exclude: [ 'password' ] }
			});
		}
		if (option.students) {
			return await User.findAll({
				where: {
					role: 1
				},
				attributes: { exclude: [ 'password' ] }
			});
		}
		if (option.agents) {
			return await User.findAll({
				where: {
					role: 987
				},
				attributes: { exclude: [ 'password' ] }
			});
		}
	}

	static async create(newUser) {
		// TODO : Sanitize data

		try {
			const hashedPassword = await bcrpyt.hash(newUser.password, 10);
			newUser.password = hashedPassword;

			// TODO:  create function to handle image creation process in utils
			const random = crypto.randomBytes(20).toString('hex');
			const arrayWithExtensions = newUser.image.name.split('.');

			const ext = arrayWithExtensions[arrayWithExtensions.length - 1];

			let newImgName = `IMG_${random}.${ext}`;

			let sampleFile = newUser.image;

			const newUserData = {
				...newUser,
				// email: newUser.email,
				password: hashedPassword,
				image: newImgName
				// lastname: newUser.lastname,
				// firstname: newUser.firstname,
				// phoneNumber: newUser.phoneNumber,
				// birhDate: newUser.birhDate
			};
			console.log(newUserData);

			const user = await User.create(newUserData);

			sampleFile.name = newImgName;
			const uploadPath = path.join(__dirname, '..', 'public', 'user_images', sampleFile.name);
			sampleFile.mv(uploadPath, function(err) {
				if (err) ErrorResponse.internalError('error while uploading the file');
			});

			if (!user) {
				throw ErrorResponse.internalError('Error when creating the user');
			}

			const emailToken = createToken(user, { type: 'email' }); // throws error

			const body = `<h3> ${user.email} </h3> to confirm your account please click this link ${process
				.env.URL}/confirm/${emailToken}.<h1>This link will expire in 30m.</h1>`;

			await sendEmail(user.email, 'Confirm your account', body);
		} catch (err) {
			// console.log(err);
			console.log(err);
			throw ErrorResponse.internalError('Error when sending confirmation email');
		}

		// res.status(201).json({ message: `${user.firstname} created. confirm your email` });
		// } catch (err) {
		// 	res.status(400).json({ error: `Bad data.` });
		// }
	}
	static async findOne(id) {
		try {
			return await User.findByPk(id, {
				attributes: { exclude: [ 'password' ] }
			});
		} catch (err) {
			throw ErrorResponse.notFound('could not find the user');
		}
	}
	static async updateOne(id, updatedUser) {
		// TODO : Sanitize data
		// TODO: Sanitize data & make sure data is passed or keep old values
		const hashedPassword = await bcrpyt.hash(updatedUser.password, 10);
		updatedUser.password = hashedPassword;

		// TODO: add image update
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
