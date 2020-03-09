const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//base route: localhost:4000/api/v1/news
router.get('/headlines/:query', ctrl.news.headlines);
router.get('/everything/:query', ctrl.news.everything);

module.exports = router;
