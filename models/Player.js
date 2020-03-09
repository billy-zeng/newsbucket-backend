const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
  name: String,
  age: Number,
  height: String,
  weight: Number,
  image: String,
  position: String,
  jerseyNumber: Number,
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }
});

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;
