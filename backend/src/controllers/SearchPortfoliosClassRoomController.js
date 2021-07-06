const SearchPortifolioByClassRoomService = require('../services/SearchPortfolioByClassRoomService');

module.exports = {
  async index(request, response) {
    const { classroom_id } = request.params;
    const { id } = request.user;

    const searchPortfolios = new SearchPortifolioByClassRoomService();

    const portfolios = await searchPortfolios.execute({
      classroom_id,
      educator_id: id,
    });

    return response.json(portfolios);
  },
};
