const db = require('./models');
const data = require('./data.json');

// seed teams
  for(let i=0; i<data.teams.length; i++){
    db.Team.create(data.teams[i], (err, createdTeam) => {
      if (err) console.log(err);
      console.log(createdTeam);
    })
  };

// seed players 
for(let i=0; i<data.teams.length; i++){
  for(let j=0; j<5; j++){
    db.Team.findOne({ teamIndex: i }, (err, foundTeam) => {
      if (err) console.log(err);
      let teamId = foundTeam._id;
      console.log(teamId);
      db.Player.create(data.players[i][j], (err, createdPlayer) => {
        if (err) console.log(err);
        createdPlayer.team = teamId;
        createdPlayer.save();
        console.log(createdPlayer);
        foundTeam.players.push(createdPlayer._id);
        foundTeam.save();
        console.log(foundTeam);
      });
    });
  };
};
