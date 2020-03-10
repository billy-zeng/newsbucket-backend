const fetch = require('node-fetch');

const headlines = (req, res) => {
  try {
    fetch(`http://newsapi.org/v2/top-headlines?q=${encodeURIComponent(req.params.name)}&language=en&apiKey=${process.env.API_KEY}`, {
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
    fetch(`http://newsapi.org/v2/everything?qInTitle=${encodeURIComponent(req.params.name)}&language=en&apiKey=${process.env.API_KEY}`, {
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

module.exports = {
  headlines,
  everything
};
