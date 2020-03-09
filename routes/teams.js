const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//base route: localhost:4000/api/v1/teams
router.get('/', ctrl.users.index);
router.get('/:id', ctrl.users.show);

module.exports = router;
