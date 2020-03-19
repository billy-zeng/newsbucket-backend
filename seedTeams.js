const db = require('./models');
const data = require('./data.json');

// seed teams
for(let i=0; i<data.teams.length; i++){
  db.Team.create(data.teams[i], (err, createdTeam) => {
    if (err) console.log(err);
    console.log(createdTeam);
  })
};
