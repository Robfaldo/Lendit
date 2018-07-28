const express = require('express');
const path = require('path');
//session
const session = require('express-session');
const bodyParser = require('body-parser');
const MongoStore = require('connect-mongo')(session);
const app = express();


var mongoose = require('mongoose');

const databasesURLs = {
    'lendit-test': `mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247101.mlab.com:47101/lendit-test`,
    'lendit-prod': `mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247171.mlab.com:47171/lendit-prod`,
    'lendit-dev': `mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247001.mlab.com:47001/lendit-dev`
}
const db_env = process.env.DB_ENV || 'production';

let mongoDB;
if (db_env === 'production') {
  mongoDB = databasesURLs['lendit-prod'];
}
else if (db_env === 'development') {
  mongoDB = databasesURLs['lendit-dev'];
}
else if (db_env === 'test') {
  mongoDB = databasesURLs['lendit-test'];
}
else {
  // just for debugging!
  console.log("db_env has not been set!");
}

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//morgan
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false
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


require('./models/item');
const Item = mongoose.model('Item');

require('./models/user');
const User = mongoose.model('User');

// this is all of the authentication path
app.use('/auth', require('./auth'));

var itemsRouter = require('./routes/api/items');
app.use('/api', itemsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
