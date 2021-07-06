const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({

  name: { type: String, enum: ['admin', 'teacher', 'parent', 'child', 'manager', 'guest'], default: 'guest' },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Role', RoleSchema);
