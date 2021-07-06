const AppError = require('../errors/AppError');
const Observation = require('../models/Observation');
const File = require('../models/File');
const Portfolio = require('../models/Portfolio');

class SendObservationFilesService {
  async execute({ observation_id, file, educator_id }) {
    const observation = await Observation.findById(observation_id);

    if (!observation) {
      throw new AppError('Erro ao Atualizar Observação');
    }

    const portfolio = await Portfolio.findOne({
      observations: observation,
    }).populate('educator', '-password');

    if (educator_id !== portfolio.educator.id) {
      throw new AppError('Você não tem permissão para esta ação');
    }

    const createdFile = await File.create({
      name: file.originalname,
      size: file.size,
      key: file.filename,
      type: file.type,
      url: '',
    });

    observation.files.push(createdFile);
    observation.updated_at = new Date();
    await observation.save();

    return { observation, createdFile };
  }
}

module.exports = SendObservationFilesService;
