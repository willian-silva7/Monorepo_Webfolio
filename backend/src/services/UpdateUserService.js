const User = require('../models/User');
const AppError = require('../errors/AppError');

class UpdateUserService {
  async execute({
    role, user_id,
  }) {
    let user = await User.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não Encontrado');
    }

    user.role = role;
    // user.isParent = isParent;
    user.updated_at = new Date();

    await user.save();

    user = await User.findById(user.id, '-password');

    return user;
  }
}

module.exports = UpdateUserService;
