const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const userServices = require('../../services/user');
const AuthError = require('../../error/AuthError');

router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', [
    check('username').not().isEmpty(),
    check('password').not().isEmpty(),
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        userServices.login(username, password, (err, user) => {
            if (err) {
                if (err instanceof AuthError) {
                    let fieldName = '';

                    switch (err.status) {
                        case 'UU':
                            fieldName = 'username';
                            break;

                        case 'WP':
                            fieldName = 'password';
                            break;

                        default:
                            break;
                    }

                    return res.status(403).json({
                        errors: [
                            {
                                param: fieldName,
                                msg: err.message,
                            },
                        ],
                    });
                } else {
                    throw err;
                }
            }

            req.session.user = user._id;
            res.end();
        });
    }
);

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.end();
});

module.exports = router;
