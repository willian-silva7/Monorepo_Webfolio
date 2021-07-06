const SearchPortifolioByInstitutionService = require('../services/SearchPortfolioByInstitutionService');

module.exports = {
  async index(request, response) {
    const { id } = request.user;

    const searchPortfolios = new SearchPortifolioByInstitutionService();

    const portfolios = await searchPortfolios.execute({
      user_id: id,
    });

    return response.json(portfolios);
  },
};
