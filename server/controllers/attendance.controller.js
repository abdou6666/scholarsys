const attendanceService = require('../services/attendance.service');
class attendanceController {
	static getAll = async (_, res, next) => {
		try {
			const attendances = await attendanceService.getAll();
			return res.status(200).json({ success: true, attendances });
		} catch (error) {
			next(error);
		}
	};
	static create = async (req, res, next) => {
		try {
			const { seanceId, state, studentId } = req.body;

			const attendance = {
				seanceId: parseInt(seanceId),
				studentId: parseInt(studentId),
				state: state.toLowerCase() === 'true'
			};

			await attendanceService.create(attendance);
			return res.status(204).json({ success: true });
		} catch (error) {
			next(error);
		}
	};
	static getOne = async (req, res, next) => {
		try {
			const id = req.params.id;
			console.log(id);
			const attendance = await attendanceService.getOne(id);
			return res.status(200).json({ success: true, attendance });
		} catch (error) {
			next(error);
		}
	};
	static update = async (req, res, next) => {
		try {
			const id = req.params.id;
			const { seanceId, state, studentId } = req.body;
			const attendance = {
				seanceId,
				state,
				studentId
			};
			await attendanceService.update(id, attendance);
			return res.status(204).json({ success: true });
		} catch (error) {
			next(error);
		}
	};
	static delete = async (req, res, next) => {
		try {
			const id = req.params.id;
			await attendanceService.delete(id);
			return res.status(200).json({ success: true });
		} catch (error) {
			next(error);
		}
	};
}

module.exports = attendanceController;
