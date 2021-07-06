const DeleteObservationService = require('../services/DeleteObservationService');
const CreateObservationService = require('../services/CreateObservationService');
const UpdateObservationService = require('../services/UpdateObservationService');
const ShowObservationService = require('../services/ShowObservatitonService');

module.exports = {
  async create(request, response) {
    const {
      title, description, curriculum_parameters, notes, dateDay,
    } = request.body;
    const { portfolio_id } = request.params;
    const requestFile = request.files;
    const { id } = request.user;

    const createObservation = new CreateObservationService();

    const observation = await createObservation.execute({
      title,
      description,
      curriculum_parameters,
      requestFile,
      portfolio_id,
      notes,
      dateDay,
      educator_id: id,
    });

    return response.json(observation);
  },

  async update(request, response) {
    const {
      title, description, curriculum_parameters, notes, dateDay,
    } = request.body;
    const { observation_id } = request.params;
    const { portfolio_id } = request.params;
    const requestFile = request.files;
    const { id } = request.user;

    const updateObservation = new UpdateObservationService();

    const observation = await updateObservation.execute({
      title,
      description,
      curriculum_parameters,
      portfolio_id,
      observation_id,
      dateDay,
      notes,
      requestFile,
      educator_id: id,
    });

    return response.json(observation);
  },

  async show(request, response) {
    const { observation_id } = request.params;
    const { id } = request.user;

    const showObservation = new ShowObservationService();

    const observation = await showObservation.execute({
      educator_id: id,
      observation_id,
    });

    return response.json(observation);
  },

  async delete(request, response) {
    const { observation_id, portfolio_id } = request.params;
    const { id } = request.user;

    const deleteObservation = new DeleteObservationService();

    const portfolio = await deleteObservation.execute({
      observation_id,
      portfolio_id,
      educator_id: id,
    });

    return response.json(portfolio);
  },
};
