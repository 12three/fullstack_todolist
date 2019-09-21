const User = require('../models/user');
const AuthError = require('../error/AuthError');

async function register(username, password) {
    let user = null;

    try {
        user = await User.findOne({ username });
    } catch (e) {
        throw e
    }

    if (user) {
        throw new AuthError('User already exist');
    }

    const newUser = new User({ username, password });
    return newUser.save();
}

async function login(username, password) {
    let user = null;

    try {
        user =  await User.findOne({ username });
    } catch (e) {
        throw e
    }

    if (!user) {
        return done(new AuthError('Unknown user', 'UU'));
    } else if (!user.checkPassword(password)) {
        return done(new AuthError('Wrong password', 'WP'));
    }

    return user;
}

module.exports = {
    register,
    login,
};
