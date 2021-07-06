const AppError = require('../errors/AppError');
const File = require('../models/File');
const Observation = require('../models/Observation');
const Portfolio = require('../models/Portfolio');

class DeleteFileService {
  async execute({ observation_id, file_id, educator_id }) {
    const observation = await Observation.findById(observation_id);

    if (!observation) {
      throw new AppError('Erro ao deletar Arquivo');
    }

    const portfolio = await Portfolio.findOne({
      observations: observation,
    }).populate('educator', '-password');

    if (educator_id !== portfolio.educator.id) {
      throw new AppError('Você não tem permissão para esta ação');
    }

    const file = await File.findById(file_id);

    if (!file) {
      throw new AppError('Erro ao deletar Arquivo');
    }

    observation.files.pop(file_id);

    await file.remove();

    await observation.save();
  }
}

module.exports = DeleteFileService;
