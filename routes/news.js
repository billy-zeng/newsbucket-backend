const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//base route: localhost:4000/api/v1/news
router.get('/headlines/:name', ctrl.news.headlines);
router.get('/everything/:name', ctrl.news.everything);
router.get('/userfeed/:userid', ctrl.news.userfeed);

module.exports = router;
