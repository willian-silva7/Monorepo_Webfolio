const AddPortfolioManagerService = require('../services/AddPortfolioManagerService');
const DeletePortfolioManagerService = require('../services/DeletePortfolioManagerService');

module.exports = {
  async update(request, response) {
    const { manager_id, portfolio_id } = request.params;

    const addPermission = new AddPortfolioManagerService();

    const portfolio = await addPermission.execute({
      manager_id,
      portfolio_id,
    });

    return response.json(portfolio);
  },

  async delete(request, response) {
    const { manager_id, portfolio_id } = request.params;

    const deletePermission = new DeletePortfolioManagerService();

    const portfolio = await deletePermission.execute({
      manager_id,
      portfolio_id,
    });

    return response.json(portfolio);
  },
};
