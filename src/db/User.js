/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


// define the User model schema
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
  },
  role: {
    type: String,
    default: 'user'
  },
  password: {
    type: String,
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String,
  },
  employeeNumber: {
    type: String,
    default: "0"
  },
  displayName: {
    type: String,
    default: "Not set"
  }
}, { timestamps: true });

UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

module.exports = mongoose.model('users', UserSchema);