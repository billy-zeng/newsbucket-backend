const db = require('../models');

const index = (req, res) => {
  db.Team.find({})
  .populate('players')
  .exec((err, allTeams) => {
    if (err) return res.status(500).json({ message: "Something went wrong, try again"});
    res.status(200).json(allTeams);
  });
};

const show = (req, res) => {
  db.Team.findById(req.params.id)
    .populate('players')
    .exec((err, foundTeam) => {
      if (err) return res.status(500).json({ message: "Something went wrong, try again"});
    res.status(200).json(foundTeam);
  });
};

module.exports = {
  index,
  show,
}
