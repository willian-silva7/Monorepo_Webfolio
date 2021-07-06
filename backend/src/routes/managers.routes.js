const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const SearchPortfoliosByManager = require('../controllers/SearchPortfoliosByManager');
const ManagerController = require('../controllers/ManagerController');
const checkUserIsAdmin = require('../middlewares/checkUserIsAdmin');

const managersRouter = Router();

managersRouter.use(ensureAuthenticated);

// find portfolios by manager
managersRouter.get('/', SearchPortfoliosByManager.index);

managersRouter.put(
  '/:portfolio_id/permission/:manager_id',
  checkUserIsAdmin,
  ManagerController.update,
);
managersRouter.put(
  '/:portfolio_id/permissiondelete/:manager_id',
  checkUserIsAdmin,
  ManagerController.delete,
);

module.exports = managersRouter;
