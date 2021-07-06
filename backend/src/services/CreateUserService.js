const { hash } = require('bcryptjs');
const User = require('../models/User');
const AppError = require('../errors/AppError');

class CreateUserService {
  async execute({
    name, email, password, institution,
  }) {
    const checkUserExist = await User.findOne({ email: `${email}` });

    if (checkUserExist) {
      throw new AppError('email já está sendo usado');
    }

    const passwordHashed = await hash(password, 8);

    const createUser = await User.create({
      name,
      email,
      password: passwordHashed,
      institution,
    });

    const user = await User.findById(createUser.id, '-password');

    return user;
  }
}

module.exports = CreateUserService;
