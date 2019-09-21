const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

router.get('/', require('./root'));
router.use('/registration', require('./registration'));
router.use('/login', require('./auth').login);
router.use('/logout', require('./auth').logout);
router.use('/todo', checkAuth, require('./todo'));

module.exports = router;