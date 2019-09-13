const express = require('express');
const root = require('./root');

const router = express.Router();

router.get('/', root);

module.exports = router;