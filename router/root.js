const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', function(req, res) {
    let message = 'Unauthenticated user';

    if (req.user) {
        message = `Hello, ${req.user.username}`;
    }

    res.render('index', { title: 'Hey', message });
});

module.exports = router;