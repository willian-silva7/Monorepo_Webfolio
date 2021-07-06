const User = require('../models/User');
const AppError = require('../errors/AppError');
const UpdateProfileService = require('../services/UpdateProfileService');

module.exports = {
  async update(request, response) {
    const {
      email, name, password, old_password, institution,
    } = request.body;
    const { id } = request.user;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      email,
      name,
      institution,
      password,
      old_password,
      user_id: id,
    });

    return response.json(user);
  },

  async show(request, response) {
    const { id } = request.user;
    const user = await User.findById(id, '-password');

    if (!user) {
      throw new AppError('Usuário não encontrado no sistema, tente mais tarde');
    }

    delete user.password;
    return response.json(user);
  },
};
