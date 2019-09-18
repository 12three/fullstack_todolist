const mongoose = require('../libs/mongoose');
const crypto = require('crypto');

const scheme = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        // required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

scheme.methods.encryptPassword = function(password) {
    return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
}

scheme.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
}

scheme.virtual('password')
    .set(password => {
        this._plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(() => this._plainPassword)



const User = mongoose.model('User', scheme);

module.exports = User;

