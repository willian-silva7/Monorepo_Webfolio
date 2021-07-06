const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const SearchPortfolioByEmailController = require('../controllers/SearchPortfolioByEmailController');

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', SearchPortfolioByEmailController.index);

module.exports = profileRouter;
