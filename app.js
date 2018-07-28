const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

//morgan
const morgan = require('morgan');
app.use(morgan('dev'));
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//session
const session = require('express-session');

//passport
const passport = require('./passport/index');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'client/build')));


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

require('./models/item');
const Item = mongoose.model('Item');

require('./models/user');
const User = mongoose.model('User');

app.get('/api/items', async (req, res) => {
    const items = await Item.findAllAndReverse();
    res.json(items)
});


app.post('/api/items', async (req, res, next) => {
    const itemToCreate = { itemName: req.body.itemName };
    const newItem = new Item(itemToCreate);
    await newItem.save();
    res.send({
        success: true,
        message: 'Listing created'
    });
    next();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
