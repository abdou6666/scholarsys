const SeanceService = require('../services/seance.service');
class SeanceController {
	static getAll = async (_, res, next) => {
		try {
			return res.status(200).json(await SeanceService.findAll());
		} catch (err) {
			next(err);
		}
	};
	static create = async (req, res, next) => {
		const {
			startHour,
			startMinute,
			seanceDuration,
			day,
			emploiId,
			teacherId,
			agentId,
			matiereId,
			salleId
		} = req.body;

		const newSeance = {
			start_hour: startHour,
			start_minute: startMinute,
			seance_duration: seanceDuration,
			day,
			emploiId,
			teacherId,
			agentId,
			salleId,
			matiereId
		};

		try {
			await SeanceService.create(newSeance);

			return res.status(201).json({
				success: true,
				message: ` Seance has been created.`
			});
		} catch (err) {
			console.log(err);
			next(err);
		}
	};
	static update = async (req, res, next) => {
		const {
			startHour,
			startMinute,
			seanceDuration,
			day,
			emploiId,
			teacherId,
			agentId,
			matiereId,
			salleId
		} = req.body;
		let updatedSeance = {
			start_hour: startHour,
			start_minute: startMinute,
			seance_duration: seanceDuration,
			day,
			emploiId,
			teacherId,
			agentId,
			salleId,
			matiereId
		};
		const id = req.params.id;
		try {
			updatedSeance = SeanceService.updateOne(id, updatedSeance);
			return res
				.status(204)
				.json({ success: true, message: `seance ${id} updated correctly` });
		} catch (err) {
			console.log(err);
			next(err);
		}
	};
	static getOne = async (req, res, next) => {
		const id = req.params.id;
		try {
			const seance = await SeanceService.findOne(id);
			return res.status(200).json(seance);
		} catch (err) {
			next(err);
		}
	};
	static delete = async (req, res, next) => {
		const id = req.params.id;
		try {
			await SeanceService.deleteOne(id);
			return res.status(200).json({ success: true, message: `seance ${id} deleted` });
		} catch (err) {
			next(err);
		}
	};
}

module.exports = SeanceController;
