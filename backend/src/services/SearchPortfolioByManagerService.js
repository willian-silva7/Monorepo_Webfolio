const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const AppError = require('../errors/AppError');

class SearchPortfolioByManagerService {
  async execute({ educator_id }) {
    const user = await User.findById(educator_id);

    const portfolios = await Portfolio.find({
      managers: user.id,
    });

    if (!portfolios) {
      throw new AppError('Nenhum portfólio encontrado');
    }

    return portfolios;
  }
}

module.exports = SearchPortfolioByManagerService;
