const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//base route: localhost:4000/api/v1/users
router.get('/:id', ctrl.users.show);
router.put('/:id/teams/:teamId', ctrl.users.addTeam);
router.delete('/:id/teams/:teamId', ctrl.users.removeTeam);
router.put('/:id/players/:playerId', ctrl.users.addPlayer);
router.delete('/:id/players/:playerId', ctrl.users.removePlayer);
router.delete('/:id', ctrl.users.destroy)
router.put('/:id', ctrl.users.edit);

module.exports = router;
