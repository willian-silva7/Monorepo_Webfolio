const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const ProfileController = require('../controllers/ProfileController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', ProfileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      institution: Joi.string(),
      password: Joi.string(),
      old_password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  ProfileController.update,
);

module.exports = profileRouter;
