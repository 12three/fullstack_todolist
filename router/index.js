const express = require('express');
const router = express.Router();

router.use('/', require('./root'));
router.use('/todo', require('./todo'));
router.use('/registration', require('./registration'));

module.exports = router;