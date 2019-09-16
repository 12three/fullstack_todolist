const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    const visitsCount = req.session.visitsCount || 1;

    req.session.visitsCount = visitsCount + 1;
    res.end(`Visits: ${visitsCount}`);
});

module.exports = router;