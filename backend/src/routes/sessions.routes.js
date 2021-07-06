const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const SessionController = require('../controllers/SessionController');

const sessionsRouter = Router();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  SessionController.index,
);

module.exports = sessionsRouter;
