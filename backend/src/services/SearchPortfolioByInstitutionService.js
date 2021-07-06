const Portfolio = require('../models/Portfolio');
const User = require('../models/User');
const AppError = require('../errors/AppError');

class SearchPortfolioByInstitutionService {
  async execute({ user_id }) {
    const user = await User.findById(user_id, '-password');

    if (!user) {
      throw new AppError('Usuário não possui cadastro no sistema');
    }

    const portfolios = await Portfolio.find({
      institution: user.institution,
    }).populate('educator', '-password');

    if (!portfolios) {
      throw new AppError('Nenhuma Turma encontrada');
    }

    return portfolios;
  }
}

module.exports = SearchPortfolioByInstitutionService;
