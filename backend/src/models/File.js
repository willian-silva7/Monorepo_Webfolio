const mongoose = require('mongoose');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs');

const FileSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  path: String,
  url: String,
  type: String,
  permissions: [{ type: String }],
  created_at: { type: Date, default: Date.now },
});

FileSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.APP_URL}/files/${this.key}`;
  }
});

FileSchema.pre('remove', function () {
  return promisify(fs.unlink)(
    path.resolve(__dirname, '..', '..', 'tmp', this.key),
  );
});

module.exports = mongoose.model('File', FileSchema);
