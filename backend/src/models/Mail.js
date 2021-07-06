const mongoose = require('mongoose');

const MailSchema = new mongoose.Schema({
  to: { type: String, required: true },
  body: String,
});

module.exports = mongoose.model('Mail', MailSchema);
