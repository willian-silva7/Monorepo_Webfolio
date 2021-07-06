const { Router } = require('express');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const SearchPortfoliosInstitutionController = require('../controllers/SearchPortfoliosByIntitutionController');
// const checkUserIsEducator = require('../middlewares/checkUserIsEducator');

const institutionRouter = Router();

institutionRouter.use(ensureAuthenticated);
// institutionRouter.use(checkUserIsEducator);
institutionRouter.get('/', SearchPortfoliosInstitutionController.index);

module.exports = institutionRouter;
