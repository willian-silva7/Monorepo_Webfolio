const mongoose = require('mongoose');

const UserTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  user_id: {
    type: String,
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserToken', UserTokenSchema);
