const Seance = require('../models/Seance/Seance');
const ErrorResponse = require('../util/helpers/ErrorResponse');
class SeanceService {
	static findAll = async (id) => {
		if (id) return await Seance.findAll({ where: { emploiId: id } });
		return await Seance.findAll();
	};
	static create = async (seance) => {
		try {
			await Seance.create(seance);
		} catch (error) {
			throw ErrorResponse.badRequest();
		}
	};
	static updateOne = async (id, updatedSeance) => {
		try {
			return await Seance.update(updatedSeance, {
				where: {
					id
				}
			});
		} catch (err) {
			throw ErrorResponse.internalError('Could not update this seance');
		}
	};
	static getOne = async (id) => {
		try {
			return await Seance.findByPk(id);
		} catch (err) {
			throw ErrorResponse.notFound('could not find the seance');
		}
	};
	static deleteOne = async (id) => {
		try {
			return await Seance.destroy({
				where: {
					id: id
				}
			});
		} catch (err) {
			throw ErrorResponse.internalError('Could not delete this seance');
		}
	};
}

module.exports = SeanceService;
