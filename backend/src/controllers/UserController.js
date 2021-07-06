const CreateUserService = require('../services/CreateUserService');
const UpdateUserService = require('../services/UpdateUserService');
const User = require('../models/User');
const AppError = require('../errors/AppError');

module.exports = {
  async create(request, response) {
    const {
      name, password, email, institution,
    } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      password,
      email,
      institution,
    });

    delete user.password;

    return response.json(user);
  },

  async show(request, response) {
    const { id } = request.params;

    const user = await User.findById(id, '-password');

    if (!user) {
      throw new AppError('Erro ao encontrar o Usuário, tente novamente');
    }

    return response.json(user);
  },

  async index(request, response) {
    const { id } = request.user;

    const user = await User.findById(id);

    if (!user) {
      throw new AppError('Erro ao carregar Usuários');
    }

    const users = await User.find({
      institution: user.institution,
    }).populate('educator', '-password');

    if (!users) {
      throw new AppError('Erro ao carregar Usuários');
    }

    return response.json(users);
  },

  async update(request, response) {
    const { role } = request.body;
    const { user_id } = request.params;

    const updateProfile = new UpdateUserService();

    const user = await updateProfile.execute({
      role,
      user_id,
    });

    return response.json(user);
  },
};
