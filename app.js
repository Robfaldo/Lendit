const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));


var mongoose = require('mongoose');

const databasesURLs = {
    'lendit-test': `mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247101.mlab.com:47101/lendit-test`,
    'lendit-prod': `mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247171.mlab.com:47171/lendit-prod`,
    'lendit-dev': `mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247001.mlab.com:47001/lendit-dev`
}
const db_env = process.env.DB_ENV || 'production';

const mongoDB;
if (db_env === 'production') {
  mongoDB = databasesURLs.lendit-prod;
}
else if (db_env === 'development') {
  mongoDB = databasesURLs.lendit-dev;
}
else if (db_env === 'test') {
  mongoDB = databasesURLs.lendit-test;
}
else {
  // just for debugging!
  console.log("db_env has not been set!");
}

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./models/item')
const Item = mongoose.model('Item');


app.get('/api/items', async (req, res) => {
    const items = await Item.findAllAndReverse();
    res.json(items)
});


app.post('/api/items', async (req, res, next) => {
    const itemToCreate = { itemName: req.body.itemName }
    const newItem = new Item(itemToCreate)
    await newItem.save()
    next();
    res.send({
        success: true,
        message: 'Listing created'
    });
});

const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
