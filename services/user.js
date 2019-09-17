const User = require('../models/user');
const AuthError = require('../error/AuthError');

function registerUser(username, password, done) {
    User.findOne({ username }, (err, user) => {
        if (err) done(err);

        if (user) {
            return done(new AuthError('User already exist'));
        }

        const newUser = new User({ username, password });
        newUser.save(done);
    });
}

module.exports = {
    registerUser,
};
