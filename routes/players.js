const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//base route: localhost:4000/api/v1/players
router.get('/', ctrl.players.index);
router.get('/:id', ctrl.players.show);

module.exports = router;
