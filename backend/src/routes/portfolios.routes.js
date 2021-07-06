const { Router } = require('express');
const multer = require('multer');
// const acl = require('express-acl');

const { celebrate, Segments, Joi } = require('celebrate');
const PortfolioController = require('../controllers/PortfolioController');
const PermissionController = require('../controllers/PermissionController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const ObservationController = require('../controllers/ObservationController');
const uploadConfig = require('../config/upload');
const checkUserIsAdmin = require('../middlewares/checkUserIsAdmin');

const upload = multer(uploadConfig);

const portfoliosRouter = Router();

portfoliosRouter.use(ensureAuthenticated);
// portfoliosRouter.use(acl.authorize);

portfoliosRouter.get('/', PortfolioController.index);
portfoliosRouter.get('/:portfolio_id', PortfolioController.show);

portfoliosRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nameChildren: Joi.string().required(),
      age: Joi.number().required(),
      classRoom: Joi.string().required(),
    },
  }),
  PortfolioController.create,
);

portfoliosRouter.delete(
  '/:portfolio_id',
  checkUserIsAdmin,
  PortfolioController.delete,
);

portfoliosRouter.put(
  '/:portfolio_id',
  // checkUserIsEducator,
  celebrate({
    [Segments.BODY]: {
      nameChildren: Joi.string().required(),
      age: Joi.number().required(),
      classRoom: Joi.string().required(),
      institution: Joi.string(),
    },
  }),
  PortfolioController.update,
);

// add user permission to portfolio

portfoliosRouter.put(
  '/:portfolio_id/permission',
  // checkUserIsEducator,
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  PermissionController.update,
);

// observação

portfoliosRouter.post(
  '/:portfolio_id/observation',
  // checkUserIsEducator,
  upload.array('files'),
  ObservationController.create,
);

portfoliosRouter.delete(
  '/:portfolio_id/observation/:observation_id',
  // checkUserIsEducator,
  ObservationController.delete,
);

module.exports = portfoliosRouter;
