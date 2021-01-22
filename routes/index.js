const express = require('express');
const path = require('path');

let router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;