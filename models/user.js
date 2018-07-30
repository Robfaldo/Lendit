const mongoose = require('mongoose'), Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Item = require('../models/item.js');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: false },
  username: { type: String, required: false },
  password: { type: String, required: false },
  karmaPoints: { type: Number, default: 10 }
});

UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
};

UserSchema.pre('save', function(next) {
  if (!this.password) {
    console.log('=============No Password provided=========================');
    next()
  } else {
    this.password = this.hashPassword(this.password);
    next()
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
