const fetch = require('node-fetch');

const headlines = (req, res) => {
  try {
    fetch(`http://newsapi.org/v2/top-headlines?q=${urlencode(req.params.query)}&apiKey=${process.env.API_KEY}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((headlinesDataStream) => headlinesDataStream.json())
    .then((headlinesDataObj) => {
      res.status(200).json(headlinesDataObj);
    })
    .catch((err) => console.log(err));;
  } catch (err) {
    return res.status(400).json({ message: "something went wrong!", err: err });
  }
};

const everything = (req, res) => {
  try {
    fetch(`http://newsapi.org/v2/everything?qInTitle=${urlencode(req.params.query)}&apiKey=${process.env.API_KEY}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((everythingDataStream) => everythingDataStream.json())
    .then((everythingDataObj) => {
      res.status(200).json(everythingDataObj);
    })
    .catch((err) => console.log(err));;
  } catch (err) {
    return res.status(400).json({ message: "something went wrong!", err: err });
  }
};

module.exports = {
  headlines,
  everything
};
