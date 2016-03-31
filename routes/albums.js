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
  res.render('albums/new', {album: {}});
});

router.get('/albums/:index', function(req, res, next) {
  var index =  req.params.index;
  Albums().where({ id: index }).first().then(function(results) {
    res.render(`albums/album`, { album: results });
  });
});

router.get('/albums/:id/edit', function(req, res, next) {
  var id = req.params.id;
  Albums().where({ id: id }).first().then(function(results) {
    res.render('albums/edit', { album: results });
  });
});

router.post('/albums', function(req, res, next) {
  Albums().insert({ name: req.body.album, artist: req.body.artist, genre: req.body.genre, stars: req.body.rating}).then(function (result) {
    res.redirect('/albums');
  });
});

router.post('/albums/:id/edit', function(req, res, next) {
  var id = req.params.id;
  Albums().update({ name: req.body.album, artist: req.body.artist, genre: req.body.genre, stars: req.body.rating }).where({id: id}).then(function (result) {
    res.redirect('/albums/');
  });
});

router.post('/albums/:id/delete', function(req, res) {
  Albums().where('id', req.params.id).del()
  .then(function (result) {
    res.redirect('/albums');
  });
});


module.exports = router;
