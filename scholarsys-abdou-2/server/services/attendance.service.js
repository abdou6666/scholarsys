const Attendance = require('../models/Attendance');
// const ErrorResponse = require('../util/helpers/ErrorResponse');
class attendanceService {
	static async getAll() {
		return await Attendance.findAll();
	}
	static async create(attendance) {
		await Attendance.create(attendance);
	}
	static async update(id, attendance) {
		await Attendance.update(attendance, {
			where: {
				id
			}
		});
	}
	static async delete(id) {
		await Attendance.destroy({
			where: {
				id
			}
		});
	}
	static async getOne(id) {
		console.log(id);
		const attendance = await Attendance.findByPk(id);

		return attendance;
	}
}

module.exports = attendanceService;
