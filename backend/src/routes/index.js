const { Router } = require('express');
// const acl = require('express-acl');

const usersRouter = require('./users.routes');
const sessionsRouter = require('./sessions.routes');
const portfoliosRouter = require('./portfolios.routes');
const profileRouter = require('./profile.routes');
const observationsRouter = require('./observations.routes');
const passwordRouter = require('./password.routes');
const filesRouter = require('./files.routes');
const classRoomRouter = require('./classroom.routes');
const permissionRoomRouter = require('./permission.routes');
const institutionRouter = require('./institution.routes');
const managersRouter = require('./managers.routes');

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

// routes.use(acl.authorize);
routes.use('/portfolio', portfoliosRouter);
routes.use('/managers', managersRouter);
routes.use('/institution', institutionRouter);
routes.use('/observation', observationsRouter);
routes.use('/files', filesRouter);
routes.use('/classrooms', classRoomRouter);
routes.use('/permission', permissionRoomRouter);

module.exports = routes;
