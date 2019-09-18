const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

router.get('/', checkAuth, require('./root'));
router.use('/login', require('./auth').login);
router.use('/logout', require('./auth').logout);
router.use('/todo', require('./todo'));
router.use('/registration', require('./registration'));

module.exports = router;