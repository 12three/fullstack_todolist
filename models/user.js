const mongoose = require('../libs/mongoose');

const scheme = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
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
const User = mongoose.model('User', scheme);

module.exports = User;

