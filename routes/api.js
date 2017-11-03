var express = require('express');
var router = express.Router();
var dc = require('../utils/dynamiccontroller.js');

router.get('/', function (req, res, next) {
    res.send('raspi dynamics api');
});

router.get('/move', function (req, res, next) {
    var rr = {'status': 200, 'err_msg': '', 'data': ''}
    if (!req.query.dir) {
        rr.status = 400;
        res.json(rr);
        return;
    }
    dc.move(req.query.dir.toLowerCase(), parseInt(req.query.speed));
    res.json(rr);
});

router.get('/stop', function (req, res, next) {
    var rr = {'status': 200, 'err_msg': '', 'data': ''};
    dc.move('', 0);
    res.json(rr);
});

module.exports = router;

