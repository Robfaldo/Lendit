const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));


var mongoose = require('mongoose');

const databases = {
  'lendit-test': 47101,
  'lendit-prod': 47171,
  'lendit-dev': 47001
}
const env = process.env.NODE_ENV || 'lendit-dev';

var mongoDB = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247001.mlab.com:${databases[env.toString()]}/${env}`
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

app.post('/api/listings', (req, res, next) => {
  const itemToCreate = { itemName: req.body.itemName }
  const newItem = new Item(itemToCreate)
  await newItem.save()
  next();
});

const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
