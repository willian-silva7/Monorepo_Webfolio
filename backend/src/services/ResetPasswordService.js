const { hash } = require('bcryptjs');
const { addHours, isAfter } = require('date-fns');
const User = require('../models/User');
const AppError = require('../errors/AppError');
const UserToken = require('../models/UserToken');

class ResetPasswordService {
  async execute({ token, password }) {
    const userToken = await UserToken.findOne({ token: `${token}` });

    if (!userToken) {
      throw new AppError('Token de usuário não existe');
    }

    const user = await User.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuário não existe');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }

    user.password = await hash(password, 8);
    await user.save();
  }
}

module.exports = ResetPasswordService;
