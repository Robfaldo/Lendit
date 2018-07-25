const express = require('express');
const app = express();

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

const Item = mongoose.model('Item');

app.get('/api/items', async (req, res) => {
  const items = await Item.find().sort({dateAdded:-1});
  res.json(items)
});

const port = process.env.PORT || 5000;
app.listen(port);

module.exports = app;
