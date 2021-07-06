const Portfolio = require('../models/Portfolio');
const AppError = require('../errors/AppError');

class AddPortfolioManagerService {
  async execute({ portfolio_id, manager_id }) {
    const portfolio = await Portfolio.findById(portfolio_id).populate(
      'educator',
      '-password',
    );

    if (!portfolio) {
      throw new AppError('Portifolio não Encontrado');
    }

    const portfolioIndex = portfolio.managers.indexOf(manager_id);
    if (portfolio.managers.indexOf(manager_id) > -1) {
      portfolio.managers.splice(portfolioIndex, 1);
    }

    await portfolio.save();

    return portfolio;
  }
}

module.exports = AddPortfolioManagerService;
