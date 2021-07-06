const UpdateUserAvatarService = require('../services/UpdateUserAvatarService');

module.exports = {
  async update(request, response) {
    const { id } = request.user;
    const avatarFilename = request.file.filename;

    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: id,
      avatarFilename,
    });

    return response.json(user);
  },
};
