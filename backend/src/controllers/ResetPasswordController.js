const ResetPasswordService = require('../services/ResetPasswordService');

module.exports = {
  async create(request, response) {
    const { token, password } = request.body;

    const resetPassword = new ResetPasswordService();

    await resetPassword.execute({
      token,
      password,
    });

    return response.status(204).json();
  },
};
