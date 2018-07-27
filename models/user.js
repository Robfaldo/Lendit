const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: { type: String, unique: false, required: false },
    username: { type: String, unique: false, required: false },
    password: { type: String, unique: false, required: false },
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
