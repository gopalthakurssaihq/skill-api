/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// define the Role model schema
const RoleSchema = new mongoose.Schema({
  label: {
    type: String,
    default: 'User'
  },
  slug:{
    type: String,
    default: 'user',
    unique: true
  }
}, { timestamps: true });

RoleSchema.plugin(uniqueValidator, { message: 'is already taken.' });

module.exports = mongoose.model('roles', RoleSchema);