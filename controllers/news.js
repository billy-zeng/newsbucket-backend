const db = require('../models');
const fetch = require('node-fetch');

const headlines = (req, res) => {
  try {
    fetch(`http://newsapi.org/v2/top-headlines?q=${encodeURIComponent(req.params.name)}&country=us&apiKey=${process.env.API_KEY}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => response.json())
    .then((responseObj) => {
      res.status(200).json(responseObj);
    })
    .catch((err) => console.log(err));
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong, please try again", err: err });
  }
};

const everything = (req, res) => {
  try {
    fetch(`http://newsapi.org/v2/everything?qInTitle=${encodeURIComponent(req.params.name)}&excludeDomains=nba.com,youtube.com,mundodeportivo.com&language=en&sortBy=publishedAt&pageSize=10&apiKey=${process.env.API_KEY}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => response.json())
    .then((responseObj) => {
      res.status(200).json(responseObj);
    })
    .catch((err) => console.log(err));
  } catch (err) {
    return res.status(400).json({ message: "Something went wrong, please try again", err: err });
  }
};

const userfeed = async (req, res) => {
  try {
    const userArticles = [];
    const searchTerms = [];
    const foundUser = await db.User.findById(req.session.currentUser.id).populate('teams').populate('players');

    for(let i=0; i<foundUser.players.length; i++){
      searchTerms.push(foundUser.players[i])
    }
    for(let j=0; j<foundUser.teams.length; j++){
      searchTerms.push(foundUser.teams[j])
    }

    let flag = 0;
    for(let k=0; k<searchTerms.length; k++){
      fetch(`http://newsapi.org/v2/everything?qInTitle=${encodeURIComponent(searchTerms[k].name)}&excludeDomains=nba.com,youtube.com,mundodeportivo.com&language=en&sortBy=publishedAt&pageSize=10&apiKey=${process.env.API_KEY}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response) => response.json())
      .then((responseObj) => {
          for(let l=0; l<responseObj.articles.length; l++){
            userArticles.push(responseObj.articles[l])
          }
        }
      )
      .then(() => {
        flag++;
        if(flag === searchTerms.length){
          res.status(200).json({ articles: userArticles });
        }
      })
      .catch((err) => console.log(err));
    }
  } catch (err) {
    if (err) return res.status(500).json({ message: "Something went wrong, try again" });
  }
}

module.exports = {
  headlines,
  everything,
  userfeed
};
