const db = require('../models');

const show = (req, res) => {
  console.log(req.session)
  db.User.findById(req.session.currentUser.id)
  .populate('teams')
  .populate('players')
  .exec((err, foundUser) => {
    if (err) return res.status(500).json({ message: "Something went wrong, try again" });
    res.status(200).json(foundUser);
  });
};

const edit = (req, res) => {
  db.User.findByIdAndUpdate(
    req.session.currentUser.id, 
    req.body,
    { new: true },
    (error, foundUser) => {
      if (error) return res.status(500).json({
        status: 500,
        message: error,
      });
    res.status(200).json(foundUser);
  });
};

// add team to a user
const addTeam = async (req, res) => {
  try {
    console.log(req.session)
    const updatedUser = await db.User.findById(req.session.currentUser.id);
    // const updatedUser = await db.User.findById(req.params.id);
    updatedUser.teams.push(req.params.teamId);
    updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
};

// remove a team from a user
const removeTeam = async (req, res) => {
  try {
    const updatedUser = await db.User.findById(req.session.currentUser.id);
    // const updatedUser = await db.User.findById(req.params.id);
    updatedUser.teams.pull({ _id: req.params.teamId })
    updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong, try again", err: err });
  };
};

// add player to a user
const addPlayer = async (req, res) => {
  try {
    console.log(req.params)
    console.log(req.session)
    const updatedUser = await db.User.findById(req.session.currentUser.id);
    // const updatedUser = await db.User.findById(req.params.id);
    updatedUser.players.push(req.params.playerId);
    updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong, try again" });
  }
};

// remove a team from a user
const removePlayer = async (req, res) => {
  try {
    let updatedUser = await db.User.findById(req.session.currentUser.id);
    // const updatedUser = await db.User.findById(req.params.id);
    updatedUser.players.pull({ _id: req.params.playerId })
    updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong, try again", err: err });
  };
};

// delete user's account
const destroy = (req, res) => {
  db.User.findByIdAndDelete(req.params.id, (err, deletedUser) => {
  // db.User.findByIdAndDelete(req.session.currentUser.id, (err, deletedUser) => {
    if (err) return res.status(500).json({ message: "Something went wrong, try again" });
    res.status(200).json(deletedUser);  
  })
};

module.exports = {
  show,
  edit,
  addTeam,
  removeTeam,
  addPlayer,
  removePlayer,
  destroy
};
