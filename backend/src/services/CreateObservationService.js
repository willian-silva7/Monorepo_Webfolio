const AppError = require('../errors/AppError');
const Portfolio = require('../models/Portfolio');
const Observation = require('../models/Observation');
const File = require('../models/File');

class CreateObservationService {
  async execute({
    title,
    description,
    curriculum_parameters,
    requestFile,
    portfolio_id,
    // educator_id,
    notes,
    dateDay,
  }) {
    const portfolio = await Portfolio.findById(portfolio_id).populate(
      'educator',
      '-password',
    );

    if (!portfolio) {
      throw new AppError('Erro ao Criar Observação');
    }

    // if (educator_id !== portfolio.educator.id) {
    //   throw new AppError('Você não tem permissão para esta ação');
    // }

    const observation = await Observation.create({
      title,
      description,
      curriculum_parameters,
      notes,
      dateDay,
    });

    if (!observation) {
      throw new AppError('Erro ao Criar Observação');
    }

    if (requestFile) {
      await Promise.all(
        requestFile.map(async (file) => {
          const newFile = new File({
            name: file.originalname,
            size: file.size,
            key: file.filename,
            path: file.path,
            type: String(file.mimetype.split('/', 1)),
            url: '',
          });

          await newFile.save();

          observation.files.push(newFile);
        }),
      );

      await observation.save();
    }

    portfolio.observations.push(observation);
    await portfolio.save();

    return observation;
  }
}

module.exports = CreateObservationService;
