const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', function(req, res) {
    const userId = req.session.user;

    if (userId) {
        User.findOne({ _id: userId }, (err, user) => {
            let message = 'Unauthenticated user';

            if (user) {
                message = `Hello, ${user.username}`;
            }

            res.render('index', { title: 'Hey', message });
        });
    }

});

module.exports = router;