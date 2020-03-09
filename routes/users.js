const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//base route: localhost:4000/api/v1/users
router.get('/:id', ctrl.users.show);
router.put('/:id', ctrl.users.edit);

module.exports = router;
