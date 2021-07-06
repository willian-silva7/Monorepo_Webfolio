const SendObservationFilesService = require('../services/SendObservationFilesService');
const DeleteFileService = require('../services/DeleteFileService');

module.exports = {
  async update(request, response) {
    const {
      originalname, size, filename, type,
    } = request.file;
    const { observation_id } = request.params;
    const { id } = request.user;

    const file = {
      originalname, size, filename, type,
    };

    const updateObservation = new SendObservationFilesService();

    const { observation, createdFile } = await updateObservation.execute({
      file,
      observation_id,
      educator_id: id,
    });

    return response.json({ observation, createdFile });
  },

  async delete(request, response) {
    const { observation_id, file_id } = request.params;
    const { id } = request.user;

    const deleteFileService = new DeleteFileService();

    await deleteFileService.execute({
      observation_id,
      file_id,
      educator_id: id,
    });

    return response.status(200).json();
  },
};
