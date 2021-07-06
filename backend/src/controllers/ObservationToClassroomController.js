const CreateObservationForClassRoomService = require('../services/CreateObservationForClassRoomService');

module.exports = {
  async create(request, response) {
    const requestFile = request.files;

    const {
      title,
      description,
      curriculum_parameters,
      portfolios,
      notes,
      dateDay,
    } = request.body;

    const parsedPortfolios = JSON.parse(portfolios);

    const createObservation = new CreateObservationForClassRoomService();

    const updatedPortfolios = await createObservation.execute({
      title,
      description,
      curriculum_parameters,
      requestFile,
      notes,
      dateDay,
      portfolios: parsedPortfolios,
    });

    return response.json(updatedPortfolios);
  },
};
