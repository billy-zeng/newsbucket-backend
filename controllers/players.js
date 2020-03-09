const db = require('../models');

const index = (req, res) => {
  db.Player.find({})
  .populate('team')
  .exec((err, allPlayers) => {
    if (err) return res.status(500).json({ message: "Something went wrong, try again"});
    res.status(200).json(allPlayers);
  });
};

const show = (req, res) => {
  db.Player.findById(req.params.id)
    .populate('team')
    .exec((err, foundPlayer) => {
      if (err) return res.status(500).json({ message: "Something went wrong, try again"});
    res.status(200).json(foundPlayer);
  });
};

module.exports = {
  index,
  show,
}
