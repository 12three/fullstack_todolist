const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    if (!req.user) {
        return res.redirect('/login');
    }

    res.render('index', { title: 'Hey', message: `Hello, ${req.user.username}` });
});

module.exports = router;