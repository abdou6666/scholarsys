const SeanceService = require('../services/seance.service');
const ErrorResponse = require('../util/helpers/ErrorResponse');
const { convertTime, calculateSeanceTime, verifyTime } = require('../util/helpers/helpers.util');
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
			// TODO: move to service
			const seances = await SeanceService.findAll(emploiId);
			const input = {
				startHour: parseInt(startHour),
				startMinute: parseInt(startMinute)
			};

			const inputTime = calculateSeanceTime(input, seanceDuration);
			const convertedInput = convertTime(inputTime);
			seances.forEach((seance) => {
				const time = {
					startHour: parseInt(seance.start_hour),
					startMinute: parseInt(seance.start_minute)
				};

				const seanceTime = calculateSeanceTime(time, seance.seance_duration);
				const convertedSeanceTime = convertTime(seanceTime);
				if (!verifyTime(convertedInput, convertedSeanceTime) && seance.day === day) {
					throw ErrorResponse.badRequest('This time is already taken by another seance.');
				}
			});

			await SeanceService.create(newSeance);

			return res.status(201).json({
				success: true,
				message: `Seance has been created.`
			});
		} catch (err) {
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
			// TODO: move to service
			const seances = await SeanceService.findAll(emploiId);
			const input = {
				startHour: parseInt(startHour),
				startMinute: parseInt(startMinute)
			};

			const inputTime = calculateSeanceTime(input, seanceDuration);
			const convertedInput = convertTime(inputTime);

			seances.forEach((seance) => {
				const time = {
					startHour: parseInt(seance.start_hour),
					startMinute: parseInt(seance.start_minute)
				};

				const seanceTime = calculateSeanceTime(time, seance.seance_duration);
				const convertedSeanceTime = convertTime(seanceTime);
				if (!verifyTime(convertedInput, convertedSeanceTime) && seance.day === day) {
					throw ErrorResponse.badRequest('This time is already taken by another seance.');
				}
			});

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
			const seance = await SeanceService.getOne(id);
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
