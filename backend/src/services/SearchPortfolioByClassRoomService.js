const Portfolio = require('../models/Portfolio');
const ClassRoom = require('../models/ClassRoom');
const AppError = require('../errors/AppError');

class SearchPortfolioByClassRoomService {
  async execute({ classroom_id, educator_id }) {
    const classRoom = await ClassRoom.findById(classroom_id);

    if (!classRoom) {
      throw new AppError('Turma não encontrada');
    }

    const portfolios = await Portfolio.find({
      classRoom: `${classRoom.name}`,
      educator: educator_id,
    });

    if (!portfolios) {
      throw new AppError('Nenhuma Turma encontrada');
    }

    return portfolios;
  }
}

module.exports = SearchPortfolioByClassRoomService;
