const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const userServices = require('../../services/user');
const AuthError = require('../../error/AuthError');

const usernameValidator = check('username').not().isEmpty();
const passwordValidator = check('password').not().isEmpty();

router.get('/', (req, res) => {
    res.render('login', { title: 'Login', pageName: 'login' });
});

router.post('/',
    [ usernameValidator, passwordValidator ],
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        const { username, password } = req.body;
        let user = null;

        try {
            user = await userServices.login(username, password);
        } catch (e) {
            if (e) {
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
                    next(e)
                }
            }
        }

        req.session.user = user._id;
        res.end();
    },
);

module.exports = router;
