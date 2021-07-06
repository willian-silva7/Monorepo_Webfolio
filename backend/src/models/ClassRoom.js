const mongoose = require('mongoose');

const classRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  educator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ClassRoom', classRoomSchema);
