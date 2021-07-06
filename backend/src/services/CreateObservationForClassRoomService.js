/* eslint-disable no-underscore-dangle */
const AppError = require('../errors/AppError');
const Portfolio = require('../models/Portfolio');
const Observation = require('../models/Observation');
const File = require('../models/File');

class CreateObservationForClassRoomService {
  async execute({
    title,
    description,
    curriculum_parameters,
    requestFile,
    portfolios,
    notes,
    dateDay,
  }) {
    if (!portfolios) {
      throw new AppError('Erro ao Criar as observações');
    }

    portfolios.map(async (portfolio) => {
      const portfolioFounded = await Portfolio.findById(portfolio._id);

      if (!portfolioFounded) {
        throw new AppError('Erro ao Criar Observação');
      }

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

      portfolioFounded.observations.push(observation);

      await portfolioFounded.save();
    });

    return portfolios;
  }
}

module.exports = CreateObservationForClassRoomService;
