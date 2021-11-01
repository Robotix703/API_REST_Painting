const mongoose = require('mongoose');

const drawerSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }
});

module.exports = mongoose.model('Drawer', drawerSchema);