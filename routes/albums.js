var express = require('express');
var router = express.Router();

var knex = require('../db/knex');
function Albums() {
  return knex('albums');
}

router.get('/albums', function(req, res, next) {
  Albums().select().then(function(results) {
    res.render('albums/index', {albums: results});
  });
});

router.get('/albums/new', function(req, res, next) {
  res.render('albums/new');
});

router.post('/albums', function(req, res, next) {
  Albums().insert({ name: req.body.album_name }).then(function () {
    res.redirect('/albums');
  });
});

module.exports = router;
