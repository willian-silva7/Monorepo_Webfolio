require('dotenv/config');

const acl = require('express-acl');

const express = require('express');
require('express-async-errors');

const mongoose = require('mongoose');
const cors = require('cors');

const { config, responseObject } = require('./config/acl');
const routes = require('./routes');
const AppError = require('./errors/AppError');
const uploadConfig = require('./config/upload');
// const rateLimiterMiddleware = require('./middlewares/rateLimiter');

mongoose.connect(process.env.MONGO_SECRET, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}); // conectar mongoose

const app = express();

// app.use(rateLimiterMiddleware);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(express.urlencoded({ extended: true }));
app.use(routes);
acl.config(config, responseObject);

app.use((err, request, response) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log('  🚀 Server started on port 3333  ');
});
