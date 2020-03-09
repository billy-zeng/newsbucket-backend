const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

//base route: localhost:4000/api/v1/users
router.get('/:id', ctrl.users.show);
router.put('/:id/teams/:teamid', ctrl.users.addTeam);
router.delete('/:id/teams/:teamid', ctrl.users.removeTeam);
router.put('/:id/players/:playerid', ctrl.users.addPlayer);
router.delete('/:id/players/:playerid', ctrl.users.removePlayer);
router.delete('/:id', ctrl.users.destroy)

module.exports = router;
