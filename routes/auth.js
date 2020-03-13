const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//base route: localhost:4000/api/v1/auth
router.post('/signup', ctrl.auth.signup);
router.post('/login', ctrl.auth.login);
router.delete('/logout', ctrl.auth.logout);

module.exports = router;
