var express = require('express');
var router = express.Router();

router.get("/wdc*", function (req, res, next) {
    res.redirect("https://wdc.tableaumapping.bi");
    next
});

router.get("/index/*", function (req, res, next) {
    res.redirect("https://index.tableaumapping.bi");
    next
});

router.post("/index/*", function (req, res, next) {
    res.redirect("https://index.tableaumapping.bi");
    next
});

router.delete("/index/*", function (req, res, next) {
    res.redirect("https://index.tableaumapping.bi");
    next
});

router.get('/', function (req, res, next) {
    console.log(req.headers['user-agent']);
    res.render('index');
});

module.exports = router;