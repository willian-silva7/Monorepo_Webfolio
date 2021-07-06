const nodemailer = require('nodemailer');
const MailTemplateProvider = require('../MailTemplateProvider/HandlebarsMailTemplateProvider');

class EtherealMailProvider {
  async sendMail(forgottenUserData) {
    const {
      to, body, forgotPasswordTemplate, subject,
    } = forgottenUserData;
    const mailTemplateProvider = new MailTemplateProvider();
    nodemailer.createTestAccount((err, account) => {
      const smtpConfig = {
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      };

      const transporter = nodemailer.createTransport(smtpConfig);

      const templateData = {
        file: forgotPasswordTemplate,
        variables: {
          name: to.name,
          link: 'https://localhost:3333/',
        },
      };

      const mailOptions = {
        from: { name: 'Equipe WebFólio', address: 'equipe@webfolio.com.br' },
        to: { address: to.email },
        subject,
        text: body,
        html: body,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
    });
  }
}

module.exports = EtherealMailProvider;
