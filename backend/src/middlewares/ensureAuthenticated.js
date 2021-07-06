const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const authConfig = require('../config/auth');
const AppError = require('../errors/AppError');

module.exports = async function ensureAuthenticated(request, response, next) {
  // validação do Token JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    // const decoded = verify(token, authConfig.jwt.secret);
    const decoded = await promisify(jwt.verify)(token, authConfig.jwt.secret);

    // console.log(decoded);

    const { sub, role } = decoded; // qual usuario criou o Token

    request.user = {
      id: sub,
      role,
    };

    return next();
  } catch (err) {
    throw new AppError('Invalid JWT token', 401);
  }
};
