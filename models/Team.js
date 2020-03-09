const mongoose = require('mongoose');

const TeamSchema = mongoose.Schema({
  name: String,
  yearFounded: String,
  allTimeRecord: String,
  conference: String,
  logo: String,
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }]
});

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;
