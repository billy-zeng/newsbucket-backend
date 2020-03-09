const db = require('./models');
const data = require('./data.json');

// seed teams
for(let i=0; i<data.teams.length; i++){
  db.Team.create(data.teams[i], (err, createdTeam) => {
    if (err) console.log(err);
    console.log(createdTeam);
  })
};

// // seed players
// for(let i=0; i<data.teams.length; i++){
//   db.Team.findOne({ teamIndex: i }, (err, foundTeam) => {
//     if (err) console.log(err);
//     let teamId = foundTeam._id;
//     console.log(teamId);
//     for(let j=i*5; j<(i+1)*5; j++){
//       db.Player.create(data.players[j], (err, createdPlayer) => {
//         if (err) console.log(err);
//         createdPlayer.team = teamId;
//         createdPlayer.save();
//         console.log(createdPlayer);
//         foundTeam.players.push(createdPlayer._id);
//         foundTeam.save();
//         console.log(foundTeam);
//       })
//     }
//   })
// };

// let tempArr=[];
// db.Team.findOne({ teamIndex: 0 }, (err, foundTeam) => {
//   if (err) console.log(err);
//   console.log(foundTeam);
//   // let tempArr=[];
//   let teamId = foundTeam._id;
//   for(let j=0; j<5; j++){
//     db.Player.create(data.players[0][j], (err, createdPlayer) => {
//       if (err) console.log(err);
//       createdPlayer.team = teamId;
//       createdPlayer.save();
//       tempArr.push(createdPlayer._id);
//       // console.log(createdPlayer);
//       // foundTeam.players.push(createdPlayer._id)
//       // foundTeam.save();
//     });
//   }
//   // tempArr.forEach(id => {
//   //   foundTeam.players.push(id);
//   //   foundTeam.save();
//   //   console.log(foundTeam);
//   // })
//   // console.log(foundTeam);
// }).then(foundTeam => {
//   tempArr.forEach(id => {
//     foundTeam.players.push(id);
//     foundTeam.save();
//     console.log(foundTeam);
//   })
// })
