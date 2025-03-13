const mongoose = require('mongoose');
const { Schema } = mongoose;

const ModuleSchema = new Schema(
  {
    value: { type: String, required: true },
    operations: { type: [String], required: true }
  },
  { _id: false }
);

const ModuleToRoleSchema = new Schema(
  {
    roleSlug: { type: String, required: true },
    modules: { type: [ModuleSchema], required: true }
  },
  { timestamps: true }
); 

module.exports = mongoose.model('modulestorole', ModuleToRoleSchema);
