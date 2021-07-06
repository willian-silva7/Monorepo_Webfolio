const Portfolio = require('../models/Portfolio');
const ClassRoom = require('../models/ClassRoom');
const AppError = require('../errors/AppError');

class UpdatePortfolioService {
  async execute({
    nameChildren, portfolio_id, age, classRoom,
    // educator_id,
    institution,
  }) {
    const portfolio = await Portfolio.findById(portfolio_id).populate(
      'educator',
    );

    if (!portfolio) {
      throw new AppError('Portifolio não Encontrado');
    }

    // if (educator_id !== portfolio.educator.id) {
    //   throw new AppError('Você não tem permissão para esta ação');
    // }

    const classRoomExist = await ClassRoom.findOne({ name: classRoom });

    if (!classRoomExist) {
      await ClassRoom.create({ name: classRoom });
    }

    portfolio.nameChildren = nameChildren;
    portfolio.age = age;
    portfolio.classRoom = classRoom;
    portfolio.institution = institution;

    await portfolio.save();

    return portfolio;
  }
}

module.exports = UpdatePortfolioService;
