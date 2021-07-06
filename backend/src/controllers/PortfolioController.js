const Portfolio = require('../models/Portfolio');
const CreatePortfolioService = require('../services/CreatePortfolioService');
const AppError = require('../errors/AppError');
const UpdatePortfolionService = require('../services/UpdatePortfolioService');
const ShowPortfolioService = require('../services/ShowPortfolioService');
const DeletePortfolioService = require('../services/DeletePortfolioService');

module.exports = {
  async create(request, response) {
    const { nameChildren, age, classRoom } = request.body;
    const { id } = request.user;

    const createPortfolio = new CreatePortfolioService();

    const portfolio = await createPortfolio.execute({
      nameChildren,
      age,
      classRoom,
      user_id: id,
    });

    return response.json(portfolio);
  },

  async index(request, response) {
    const { id } = request.user;
    const portfolios = await Portfolio.find({
      educator: id,
    }).populate('educator', '-password');

    if (!portfolios) {
      throw new AppError('Erro ao encontrar o portfolio, tente novamente');
    }

    return response.json(portfolios);
  },

  async show(request, response) {
    const { portfolio_id } = request.params;
    const { id } = request.user;

    const showPortfolio = new ShowPortfolioService();

    const portfolio = await showPortfolio.execute({
      portfolio_id,
      user_id: id,
    });

    return response.json(portfolio);
  },

  async delete(request, response) {
    const { portfolio_id } = request.params;
    const { id } = request.user;

    const deletePortfolio = new DeletePortfolioService();

    const portfolio = deletePortfolio.execute({
      educator_id: id,
      portfolio_id,
    });

    return response.json(portfolio);
  },

  async update(request, response) {
    const {
      nameChildren, age, classRoom, institution,
    } = request.body;

    const { portfolio_id } = request.params;
    const { id } = request.user;

    const updatePortifolio = new UpdatePortfolionService();

    const portfolio = await updatePortifolio.execute({
      nameChildren,
      portfolio_id,
      age,
      classRoom,
      institution,
      educator_id: id,
    });

    return response.json(portfolio);
  },
};
