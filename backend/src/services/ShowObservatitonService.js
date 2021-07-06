// const Portfolio = require('../models/Portfolio');
const AppError = require('../errors/AppError');
const Observation = require('../models/Observation');

class ShowObservationService {
  async execute({
    observation_id,
    // educator_id
  }) {
    const observation = await Observation.findById(observation_id);

    if (!observation) {
      throw new AppError('Erro ao carregar Observação');
    }

    // const portfolio = await Portfolio.findOne({
    //   observations: observation,
    // }).populate('educator', '-password');

    // if (educator_id !== portfolio.educator.id) {
    //   throw new AppError('Você não tem permissão para esta ação');
    // }

    return observation;
  }
}

module.exports = ShowObservationService;
