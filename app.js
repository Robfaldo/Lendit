const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const MongoStore = require('connect-mongo')(session);
const databaseUrl = require('./database');
var mongoose = require('mongoose');

//busboy
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
app.use(busboy());
app.use(bodyParser.json());
app.use(busboyBodyParser());

// require routes
var itemsRouter = require('./routes/api/items');
// require models
require('./models/item');
const Item = mongoose.model('Item');
require('./models/user');
const User = mongoose.model('User');

// connect to the database
mongoose.connect(databaseUrl);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//morgan
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: "this is a test secret",
    store: new MongoStore({mongooseConnection: db}),
    resave: false,
    saveUninitialized: false,
  })
);

//passport
const passport = require('./passport/index');
app.use(passport.initialize());
app.use(passport.session()); // this calls deserialize

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'client/build')));

// item routes
app.use('/api', itemsRouter);

// this is all of the authentication path
app.use('/auth', require('./auth'));

// this is the image upload path
app.use('/api', require('./upload'));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
