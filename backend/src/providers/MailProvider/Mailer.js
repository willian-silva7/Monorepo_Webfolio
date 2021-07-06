const nodemailer = require('nodemailer');
const path = require('path');

const {
  host, pass, port, user,
} = require('../../config/mail');

const sendEmail = async (mailObj) => {
  const {
    from, to, subject, text,
  } = mailObj;

  try {
    const transport = nodemailer.createTransport({
      host,
      port,
      auth: { user, pass },
    });

    const info = await transport.sendMail({
      from, // sender address,
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html: {
        path: path.resolve(__dirname, '../template/mail.html'),
      },
    });
  } catch (err) {

  }
};

module.exports = sendEmail;
