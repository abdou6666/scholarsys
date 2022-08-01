const UserService = require('../services/user.service');
// TODO : handle cases when find might return empty array or not obj
// TODO : ADD Service layer & clean up controller

class userController {
	static getAll = async (_req, res, next) => {
		try {
			return res.status(200).json(await UserService.findAll());
		} catch (err) {
			next(err);
		}
	};

	static create = async (req, res, next) => {
		const { firstname, lastname, email, password, phoneNumber, birthDate } = req.body;
		// const newUser = {
		// 	firstname,
		// 	lastname,
		// 	email,
		// 	password,
		// 	phoneNumber,
		// 	birthDate
		// };
		const newUser = {
			email,
			password
		};
		// console.log(newUser);
		try {
			await UserService.create(newUser);

			return res
				.status(201)
				.json({ message: `${newUser.firstname} created.Please confirm your account.` });
		} catch (err) {
			// next(err);
			res.sendStatus(400);
			next(err);
		}
	};

	static getOne = async (req, res, next) => {
		const id = req.params.id;
		try {
			const user = await UserService.findOne(id);
			return res.status(200).json(user);
		} catch (err) {
			next(err);
			// res.status(404).json({ error: `user ${id} not found` });
		}
	};

	static update = async (req, res, next) => {
		const { firstname, lastname, email, password, phoneNumber, birthDate } = req.body;
		let updatedUser = {
			firstname,
			lastname,
			email,
			password,
			phoneNumber,
			birthDate
		};
		const id = req.params.id;
		try {
			updatedUser = UserService.updateOne(id, updatedUser);
			return res.status(204).json(updatedUser);
		} catch (err) {
			console.log(err);
			// console.log(err);
			next(err);
			// res.status(404).json({ error: `user with ${id} not found` });
		}
	};
	static delete = async (req, res, next) => {
		const id = req.params.id;
		try {
			await UserService.deleteOne(id);
			return res.status(200).json({ message: `user ${id} deleted` });
		} catch (err) {
			next(err);
			// return res.status(500).json({ error: `Somethign went wrong when deleting user ${id}` });
		}
	};
}

module.exports = userController;
