const bcrypt = require('bcryptjs');
const db = require('../models');

// POST Registration - Creating New User
const signup = async (req, res) => {
  const newUser = req.body;
  try {
    // validate form complete
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "All fields are required for signup." });
    }
    // validate unique username
    const foundUsername = await db.User.findOne({ username: req.body.username });
    if (foundUsername) {
      return res.status(400).json({
        message:
          "This account already exists. Please use a different username."
      });
    }
    // validate unique email
    const foundEmail = await db.User.findOne({ email: req.body.email });
    if (foundEmail) {
      return res.status(400).json({
        message:
          "This account already exists. Please use a different email address."
      });
    }
    // hash password and create user
    const hash = await bcrypt.hashSync(req.body.password, 10);
    newUser.password = hash;
    const createdUser = await db.User.create(newUser);
    const resObj = {
      status: 200,
      data: createdUser,
      requestedAt: new Date().toLocaleString()
    };
    res.status(200).json(resObj);
  } catch (err) {
    return res.status(400).json({ error: "Bad request" });
  }
};

// POST Login - Authenticate User, create session - async await
const login = async (req, res) => {
  try {
    // check if username or password is empty
    if (!req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Please enter your username and password" });
    }
    // lookup username in database, return error msg if not found
    const foundUser = await db.User.findOne({ username: req.body.username });
    if (!foundUser) {
      return res
        .status(400)
        .json({ message: "Username or password is incorrect" });
    }
    // check if password entered matches foundUser's password
    const passwordsMatch = await bcrypt.compare(req.body.password, foundUser.password);
    if (!passwordsMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // create new session for logged in user
    req.session.currentUser = { id: foundUser._id };
    res.json({ status: 200, message: 'Success', data: foundUser._id });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

// DELETE destroy session
const logout = (req, res) => {
  if (!req.session.currentUser) {
    return res.status(401).json({ message: 'Unauthorized, please login and try again' })
  }
  req.session.destroy((err) => {
    if (err) return res.status(400).json(err);
    res.json({ message: 'Successfully logged out' , status: 200});
  });  
};

module.exports = {
  signup,
  login,
  logout
};
