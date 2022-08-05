const EmploiService = require('../services/emploi.service');
class EmploiController {
	static getAll = async (_, res, next) => {
		try {
			return res.status(200).json(await EmploiService.findAll());
		} catch (err) {
			next(err);
		}
	};
	static create = async (req, res, next) => {
		const { name, classeId, agentId } = req.body;
		const emploi = {
			name,
			classeId,
			agentId
		};
		try {
			await EmploiService.create(emploi);
			return res.status(201).json({
				success: true,
				message: `Emploi has been created.`
			});
		} catch (error) {
			next(error);
		}
	};
	static update = async (req, res, next) => {
		const { name, classId, agentId } = req.body;
		const id = req.params.id;
		const updatedEmploi = {
			name,
			classId,
			agentId
		};
		try {
			await EmploiService.updateOne(id, updatedEmploi);
			return res
				.status(204)
				.json({ success: true, message: `Emploi ${id} updated correctly` });
		} catch (error) {
			next(error);
		}
	};
	static getOne = async (req, res, next) => {
		const id = req.params.id;
		try {
			const emploi = await EmploiService.getOne(id);
			return res.status(200).json(emploi);
		} catch (error) {
			next(error);
		}
	};
	static delete = async (req, res, next) => {
		const id = req.params.id;
		try {
			await EmploiService.deleteOne(id);
			return res.status(200).json({ success: true, message: `Emploi ${id} deleted` });
		} catch (err) {
			next(err);
		}
	};
}

module.exports = EmploiController;
