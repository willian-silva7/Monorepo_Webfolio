const AppError = require('../errors/AppError');
const Portfolio = require('../models/Portfolio');

class DeletePortfolioService {
  async execute({ portfolio_id /* , educator_id */ }) {
    const portfolio = await Portfolio.findById(portfolio_id).populate(
      'educator',
      '-password',
    );

    if (!portfolio) {
      throw new AppError('Erro ao deletar Portfolio');
    }

    // if (educator_id !== portfolio.educator.id) {
    //   throw new AppError('Você não tem permissão para esta ação');
    // }

    await Portfolio.findByIdAndDelete(portfolio_id);

    return portfolio;
  }
}

module.exports = DeletePortfolioService;
