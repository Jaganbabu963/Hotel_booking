const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must a have a Name'],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'A User must have an email'],
    unique: true,
    validate: [validator.isEmail, 'Provide Correct Email AADDRESS'],
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords doesnt match',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});
userSchema.methods.checkPassword = async function (in_password, db_passwowrd) {
  return await bcrypt.compare(in_password, db_passwowrd);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
