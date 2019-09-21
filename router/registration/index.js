const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const userServices = require('../../services/user');
const AuthError = require('../../error/AuthError');

const usernameValidator = check('username')
    .not()
    .isEmpty()
    .trim()
    .isLength({ min: 3 });

const passwordValidator = check('password')
    .not()
    .isEmpty()
    .isLength({ min: 5 });

router.get('/', function(req, res) {
    res.render('registration', { title: 'Registration', pageName: 'registration' });
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
            user = await userServices.register(username, password);
        } catch (e) {
            if (e instanceof AuthError) {
                return res.status(409).json({
                    errors: [
                        {
                            param: 'username',
                            msg: e.message,
                        },
                    ],
                });
            } else {
                next(e)
            }
        }

        req.session.user = user._id;
        res.status(201).end();
    }
);

module.exports = router;
