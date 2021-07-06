const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  nameChildren: { type: String, required: true },
  age: { type: Number, required: true },
  classRoom: { type: String, required: true },
  observations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Observation' }],
  educator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  institution: String,
  managers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  educator_name: [{ type: String }],
  permissions: [{ type: String }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
