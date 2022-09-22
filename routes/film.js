const Router = require('express');
const router = new Router();
const filmController = require('../controller/Film');
router.get('/film/:id', filmController.getFilm);

module.exports = router;