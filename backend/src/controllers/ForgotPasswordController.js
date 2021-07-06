const SendForgotPasswordEmailService = require('../services/SendForgotPasswordEmailService');

module.exports = {
  async create(request, response) {
    const { email } = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  },
};
