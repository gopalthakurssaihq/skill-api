const mongoose = require('mongoose');

const ExpertiseLevelSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  sequence: {type: String, unique: true, required: true}
},{ timestamps: true });

module.exports = mongoose.model('expertiselevels', ExpertiseLevelSchema);
