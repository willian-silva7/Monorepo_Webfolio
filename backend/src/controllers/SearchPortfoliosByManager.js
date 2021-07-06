const SearchPortfolioByManagerService = require('../services/SearchPortfolioByManagerService');

module.exports = {
  async index(request, response) {
    const { id } = request.user;

    const searchPortfolios = new SearchPortfolioByManagerService();

    const portfolios = await searchPortfolios.execute({
      educator_id: id,
    });

    return response.json(portfolios);
  },
};
