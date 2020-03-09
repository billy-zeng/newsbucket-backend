const db = require('../models');

const show = (req, res) => {
  db.User.findById(req.session.currentUser.id)
  .populate('teams')
  .populate('players')
  .exec((err, foundUser) => {
    if (err) return res.status(500).json({ message: "Something went wrong, try again" });
    res.status(200).json(foundUser);
  });
};

// add team to a user
const addTeam = async (req, res) => {
  try {
    const updatedUser = await db.User.findById(req.session.currentUser.id);
    updatedUser.teams.push(req.body);
    updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
};

// remove a team from a user
const removeTeam = async (req, res) => {
  try {
    let updatedUser = await db.User.findById(req.session.currentUser.id);
    updatedUser.teams.pull({ _id: req.params.teamid })
    updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong, try again", err: err });
  };
};

// add player to a user
const addPlayer = async (req, res) => {
  try {
    const foundUser = await db.User.findById(req.session.currentUser.id);
    foundUser.players.push(req.body);
    foundUser.save();
    res.status(200).json(foundUser);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
};

// remove a team from a user
const removePlayer = async (req, res) => {
  try {
    let updatedUser = await db.User.findById(req.session.currentUser.id);
    updatedUser.players.pull({ _id: req.params.playerid })
    updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong, try again", err: err });
  };
};

// delete user's account
const destroy = (req, res) => {
  db.User.findByIdAndDelete(req.session.currentUser.id, (err, deletedUser) => {
    if (err) return res.status(500).json({ message: "Something went wrong, try again" });
    res.status(200).json(deletedUser);  
  })
};

module.exports = {
  show,
  addTeam,
  removeTeam,
  addPlayer,
  removePlayer,
  destroy
};
