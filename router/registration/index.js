const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const userServices = require('../../services/user');
const AuthError = require('../../error/AuthError');

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
        const { username, password } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        userServices.registerUser( username, password, (err) => {
            if (err) {
                console.log(err);
                if (err instanceof AuthError) {
                    return res.status(409).json({
                        errors: [{
                            param: 'username',
                            msg: err.message,
                        }],
                    });
                } else {
                    throw err;
                }
            }

            res.status(201).end();
        });

    }
);

module.exports = router;
