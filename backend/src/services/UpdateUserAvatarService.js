const path = require('path');
const fs = require('fs');
const User = require('../models/User');
const AppError = require('../errors/AppError');
const uploadConfig = require('../config/upload');

class UpdateUserAvatarService {
  async execute({ user_id, avatarFilename }) {
    const user = await User.findById(user_id, '-password');

    if (!user) {
      throw new AppError('Somente usuário autheticado pode mudar de avatar');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    user.updated_at = new Date();

    await user.save();

    return user;
  }
}

module.exports = UpdateUserAvatarService;
