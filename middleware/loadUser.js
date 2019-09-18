const User = require('../models/user');

module.exports = function(req, res, next) {
    if (!req.session.user) return next();

    User.findById(req.session.user, (err, user) => {
        if (err) return next(err);

        if (user) {
            req.user = res.locals.user = user;
        }

        next();
    });
}