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
    const foundUser = await db.User.findById(req.session.currentUser.id);
    foundUser.teams.push(req.body);
    foundUser.save();
    res.status(200).json(foundUser);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
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
  addPlayer,
  destroy
};
