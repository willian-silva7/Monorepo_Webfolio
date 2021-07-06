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

    if (portfolio.managers.indexOf(manager_id) < 0) {
      portfolio.managers.push(manager_id);
    }

    await portfolio.save();

    return portfolio;
  }
}

module.exports = AddPortfolioManagerService;
