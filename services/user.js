const User = require('../models/user');
const AuthError = require('../error/AuthError');

function register(username, password, done) {
    User.findOne({ username }, (err, user) => {
        if (err) done(err);

        if (user) {
            return done(new AuthError('User already exist'));
        }

        const newUser = new User({ username, password });
        newUser.save(done);
    });
}

function login(username, password, done) {
    User.findOne({ username }, (err, user) => {
        if (err) done(err);

        if (!user) {
            return done(new AuthError('Unknown user', 'UU'));
        } else if (!user.checkPassword(password)) {
            return done(new AuthError('Wrong password', 'WP'));
        }

        done(null, user)
    });
}

module.exports = {
    register,
    login,
};
