const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const authConfig = require('../config/auth');
const User = require('../models/User');
const AppError = require('../errors/AppError');

class AuthenticateUserService {
  async execute({ email, password }) {
    let user = await User.findOne({ email: `${email}` });

    const { role } = user;

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (passwordMatched === false) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role }, secret, {
      subject: user.id,
      expiresIn,
    });

    user = await User.findById(user.id, '-password');

    return { user, token };
  }
}

module.exports = AuthenticateUserService;
