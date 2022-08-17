const Emploi = require('../models/Emploi/Emploi');
const ErrorResponse = require('../util/helpers/ErrorResponse');
const createEmplois = require('../util/helpers/PDF.helpers');
class EmploiService {
	static findAll = async () => {
		return await Emploi.findAll();
	};
	static create = async (emploi) => {
		const emp = {
			name: emploi.name,
			classeId: emploi.classeId,
			agentId: emploi.agentId
		};

		try {
			await Emploi.create(emp);
		} catch (error) {
			throw ErrorResponse.badRequest();
		}
	};
	static updateOne = async (id, updatedEmploi) => {
		try {
			return await Emploi.update(updatedEmploi, {
				where: {
					id
				}
			});
		} catch (err) {
			throw ErrorResponse.internalError('Could not update this time table');
		}
	};
	static getOne = async (id) => {
		try {
			return await Emploi.findByPk(id);
		} catch (err) {
			throw ErrorResponse.notFound('could not find the time table');
		}
	};
	static deleteOne = async (id) => {
		try {
			return await Emploi.destroy({
				where: {
					id: id
				}
			});
		} catch (err) {
			throw ErrorResponse.internalError('Could not delete this time table');
		}
	};
	static generateEmploi = async () => {
		createEmplois();
	};
}
module.exports = EmploiService;
