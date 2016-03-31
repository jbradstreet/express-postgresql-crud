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

router.get('/albums/:index', function(req, res, next) {
  var index =  req.params.index;
  Albums().where({ id: index }).first().then(function(results) {
    res.render(`albums/album`, { album: results });
  });
});

router.post('/albums', function(req, res, next) {
  Albums().insert({ name: req.body.album_name, artist: req.body.artist_name, genre: req.body.genre }).then(function () {
    res.redirect('/albums');
  });
});

module.exports = router;
