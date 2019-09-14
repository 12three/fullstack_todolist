const express = require('express');
const router = express.Router();
const root = require('./root');
const todo = require('./todo');

router.use('/', root);
router.use('/todo', todo);

module.exports = router;