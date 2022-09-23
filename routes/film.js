const Router = require('express');
const router = new Router();
const filmController = require('../controller/FilmController');

router.get('/film/:title', filmController.getFilm);

module.exports = router;