const AppError = require('../errors/AppError');
const User = require('../models/User');

module.exports = async function checkUserIsAdmin(request, response, next) {
  const { id } = request.user;
  const user = await User.findById(id);

  if (!user) {
    throw new AppError('Você não possui permissão para fazer isso...', 403);
  }

  if (user.role !== 'admin') {
    throw new AppError('Você não possui permissão para fazer isso...', 403);
  }
  next();
};
