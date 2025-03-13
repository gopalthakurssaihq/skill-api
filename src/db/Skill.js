const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  category: { type: String }
},{ timestamps: true });

module.exports = mongoose.model("skills", SkillSchema);
