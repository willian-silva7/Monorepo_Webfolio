const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const AppError = require('../errors/AppError');

module.exports = {
  async index(request, response) {
    const { id } = request.user;

    const user = await User.findById(id, '-password');
    if (!user) {
      throw new AppError('Usuário não encontrado no sistema, tente mais tarde');
    }

    const portfolios = await Portfolio.find({
      permissions: user.email,
    }).populate('educator', '-password');

    if (!portfolios) {
      throw new AppError('Erro ao encontrar o portfolio, tente novamente');
    }

    return response.json(portfolios);
  },
};
