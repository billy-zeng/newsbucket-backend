const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'Player'
  }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
