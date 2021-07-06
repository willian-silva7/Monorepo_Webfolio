const MailTemplateProvider = require('./HandlebarsMailTemplateProvider');

class CallHandlebars {
  async execute(templateData) {
    const mailTemplateProvider = new MailTemplateProvider();
    const example = await mailTemplateProvider.parse(templateData);
    console.log(example);

    return example;
  }
}

module.exports = CallHandlebars;
