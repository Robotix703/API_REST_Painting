const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
  name: { type: String, required: true },
  gamme: { type: String, required: true },
  type: { type: String, required: true },
  colorCode: { type: String, required: true }
});

module.exports = mongoose.model('Color', colorSchema);
