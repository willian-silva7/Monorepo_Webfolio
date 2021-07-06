const { hash, compare } = require('bcryptjs');
const User = require('../models/User');
const AppError = require('../errors/AppError');

class UpdateProfileService {
  async execute({
    name, email, password, old_password, user_id, institution,
  }) {
    let user = await User.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não Encontrado');
    }

    const checkEmailExist = await User.findOne({ email: `${email}` });

    if (checkEmailExist && checkEmailExist.id !== user.id) {
      throw new AppError('email já está sendo usado');
    }

    user.name = name;
    user.email = email;
    user.institution = institution;

    if (password && !old_password) {
      throw new AppError('Deve informar a senha antiga para atualizar a senha');
    }

    if (password && old_password) {
      const checkedOldPassword = await compare(old_password, user.password);

      if (!checkedOldPassword) {
        throw new AppError('Senha antiga não está correta');
      }

      user.password = await hash(password, 8);
    }

    user.updated_at = new Date();

    await user.save();

    user = await User.findById(user.id, '-password');

    return user;
  }
}

module.exports = UpdateProfileService;
