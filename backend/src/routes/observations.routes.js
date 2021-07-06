const { Router } = require('express');
const multer = require('multer');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const ObservationController = require('../controllers/ObservationController');
const FilesController = require('../controllers/FilesController');
const ObservationToClassroomController = require('../controllers/ObservationToClassroomController');

const uploadConfig = require('../config/upload');
// const checkUserIsEducator = require('../middlewares/checkUserIsEducator');

const upload = multer(uploadConfig);

const observationsRouter = Router();

observationsRouter.use(ensureAuthenticated);
// observationsRouter.use(checkUserIsEducator);
observationsRouter.post(
  '/',
  upload.array('files'),
  ObservationToClassroomController.create,
);

observationsRouter.put(
  '/:portfolio_id/:observation_id',
  upload.array('files'),
  ObservationController.update,
);

observationsRouter.get('/:observation_id', ObservationController.show);

observationsRouter.put(
  '/file/:portfolio_id/:observation_id',
  upload.single('file'),
  FilesController.update,
);

module.exports = observationsRouter;
