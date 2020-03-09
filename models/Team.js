const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
  name: String,
  teamIndex: Number,
  abbrev: String,
  yearFounded: Number,
  conference: String,
  logo: String,
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }]
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
