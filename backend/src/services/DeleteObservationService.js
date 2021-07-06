const AppError = require('../errors/AppError');
const Portfolio = require('../models/Portfolio');
const Observation = require('../models/Observation');
const File = require('../models/Observation');

class DeleteObservationService {
  async execute({
    observation_id, portfolio_id,
    //  educator_id
  }) {
    const portfolio = await Portfolio.findById(portfolio_id).populate(
      'educator',
      '-password',
    );

    if (!portfolio) {
      throw new AppError('Erro ao deletar Observação');
    }

    // if (educator_id !== portfolio.educator.id) {
    //   throw new AppError('Você não tem permissão para esta ação');
    // }

    const observation = await Observation.findById(observation_id);

    if (observation.files) {
      await Promise.all(observation.files.map(async (file) => {
        await File.findByIdAndDelete(file);

        observation.files.pop(file);
      }));
    }

    await observation.save();

    await Observation.findByIdAndDelete(observation_id);

    if (!observation) {
      throw new AppError('Erro ao deletar Observação');
    }

    portfolio.observations = portfolio
      .observations
      // eslint-disable-next-line eqeqeq
      .filter((observationId) => observationId != observation_id);

    await portfolio.save();

    return observation;
  }
}

module.exports = DeleteObservationService;
