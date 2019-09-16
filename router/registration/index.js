const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('registration', { title: 'Registration' });
});

router.post('/', [
    check('username')
        .not().isEmpty()
        .trim()
        .isLength({ min: 3 }),
    check('password')
        .not().isEmpty()
        .isLength({ min: 5 }),
], (req, res) => {
    const { username, rassword } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    res.end('OK');
});

module.exports = router;
