const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT

const routes = require('./routes');

// --------------------------------- Middleware --------------------------------- //

// cors
const corsOptions = {
  origin: ['https://newsbucket-app.herokuapp.com'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// BodyParser
app.use(bodyParser.json());

// Express Session
app.use(
  session({
    store: new MongoStore({ url: process.env.MONGODB_URI }), 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false,
    cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // 2 weeks
    }
  })
);

// ----------------------------------- Routes ----------------------------------- //
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.users);
app.use('/api/v1/teams', routes.teams);
app.use('/api/v1/players', routes.players);
app.use('/api/v1/news', routes.news);

// ----------------------------------- Start Server ----------------------------------- //
app.listen(PORT, () =>
  console.log(`Server connected at http://localhost:${PORT}`)
);
