const { Router } = require('express');

const { celebrate, Segments, Joi } = require('celebrate');
const ForgotPasswordController = require('../controllers/ForgotPasswordController');
const ResetPasswordController = require('../controllers/ResetPasswordController');

const passwordRouter = Router();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  ForgotPasswordController.create,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  ResetPasswordController.create,
);

module.exports = passwordRouter;
