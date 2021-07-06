const AddPortfolioPermission = require('../services/AddPortfolioPermission');

module.exports = {
  async update(request, response) {
    const { email } = request.body;
    // const { id } = request.user;
    const { portfolio_id } = request.params;

    const addPermission = new AddPortfolioPermission();

    const portfolio = await addPermission.execute({
      portfolio_id,
      email,
      // educator_id: id,
    });

    return response.json(portfolio);
  },
};
