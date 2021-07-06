const mongoose = require('mongoose');

const ObservationSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  curriculum_parameters: { type: String },
  notes: { type: String },
  dateDay: { type: String },
  files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File', default: [] }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Observation', ObservationSchema);
