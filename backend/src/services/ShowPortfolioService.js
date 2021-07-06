const Portfolio = require('../models/Portfolio');
const AppError = require('../errors/AppError');
const User = require('../models/User');

class ShowPortfolioService {
  async execute({ portfolio_id, user_id }) {
    const checkedUser = await User.findById(user_id);

    const portfolio = await Portfolio.findById(portfolio_id).populate({
      path: 'observations',
      populate: { path: 'files' },
    });

    if (!portfolio) {
      throw new AppError('Erro ao encontrar o portfolio, tente novamente');
    }

    const { permissions, managers, educator } = portfolio;

    if (permissions.indexOf(checkedUser.email) > -1) {
      return portfolio;
    }
    if (managers.indexOf(checkedUser.id) > -1) {
      return portfolio;
    }
    // eslint-disable-next-line eqeqeq
    if (checkedUser.id == educator) {
      return portfolio;
    }
    throw new AppError(
      'Você não possui permissão para visualizar este Portfólio',
    );
  }
}

module.exports = ShowPortfolioService;
