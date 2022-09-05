const UserService = require('../services/user.service');
const User = require('../models/User/User');
const { Op } = require("sequelize");
// TODO : handle cases when find might return empty array or not obj
// TODO : ADD Service layer & clean up controller

class userController {
	static getAll = async (_, res, next) => {
		try {
			return res.status(200).json(await UserService.findAll());
		} catch (err) {
			next(err);
		}
	};
	static getTeachers = async (_, res, next) => {
		try {
			return res.status(200).json(await UserService.findAll({ teachers: true }));
		} catch (err) {
			next(err);
		}
	};
	static getAgents = async (_, res, next) => {
		try {
			return res.status(200).json(await UserService.findAll({ agents: true }));
		} catch (err) {
			next(err);
		}
	};
	static getStudents = async (_, res, next) => {
		try {
			return res.status(200).json(await UserService.findAll({ students: true }));
		} catch (err) {
			next(err);
		}
	};

	static create = async (req, res, next) => {
		const {
			firstname,
			lastname,
			email,
			password,
			phoneNumber,
			birthDate,
			role,
			salary
		} = req.body;
		const newUser = {
			firstname,
			lastname,
			email,
			password,
			phoneNumber,
			birthDate,
			image: req.files.image
		};
		if (role) {
			newUser.role = +role;
			newUser.salary = salary;
		}

		try {
			await UserService.create(newUser);

			return res
				.status(201)
				.json({ message: `${newUser.firstname} created.Please confirm your account.` });
		} catch (err) {
			console.log(err);

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
			return res.status(204).json({ success: true, updatedUser });
		} catch (err) {
			// console.log(err);
			next(err);
		}
	};
	static delete = async (req, res, next) => {
		const id = req.params.id;
		try {
			await UserService.deleteOne(id);
			return res.status(200).json({ success: true, message: `user ${id} deleted` });
		} catch (err) {
			next(err);
		}
	};
	static addClassToUser = async (req, res, next) => {
		const id = req.params.id; //user id

		const { classeId } = req.body;
		try {
			await UserService.addClassToUser(id, classeId);
			return res.status(200).json({ success: true, message: `user added to class` });
		} catch (error) {
			next(error);
		}
	};
	static removeClassToUser = async (req, res, next) => {
		const id = req.params.id; //user id
		const { classeId } = req.body;
		try {
			await UserService.removeClassToUser(id, classeId);
			return res.status(200).json({ success: true, message: `user removed from class` });
		} catch (error) {
			next(error);
		}
	};
	static StudentCount = async (req, res, next) => {
		//console.log('test');
		const studentC = await  User.count({where :{role:1}});
		console.log(studentC);
		if (! studentC){
			res.status(500).json({success:false})
	
		}
		
		res.status(200).json(studentC) 
	}
	static TeacherCount = async (req, res, next) => {
		console.log('test');
		const teachertC = await  User.count({where :{role:{[Op.eq]: 666}}});
		//console.log(studentC);
		if (! teachertC){
			res.status(500).json({success:false})
	
		}
		
		res.status(200).json(teachertC) 
	}
	static AgentCount = async (req, res, next) => {
		console.log('test');
		const agentC = await  User.count({where :{role:{[Op.eq]: 987}}});
		//console.log(studentC);
		if (! agentC){
			res.status(500).json({success:false})
	
		}
		
		res.status(200).json(agentC) 
	}


}

module.exports = userController;
