const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', function(req, res) {
    const message = req.user ? `Hello, ${req.user.username}`: 'Who are you?';

    res.render('index', { title: 'Hey', message });
});

module.exports = router;