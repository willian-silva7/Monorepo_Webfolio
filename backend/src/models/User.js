const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String, unique: true, required: true, lowercase: true,
  },
  avatar: { type: String, default: null },
  password: { type: String, required: true },
  institution: String,
  isParent: { type: Boolean, default: true },
  role: { type: String, enum: ['admin', 'teacher', 'parent', 'child', 'manager', 'guest'], default: 'teacher' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
