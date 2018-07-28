var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

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

const databaseUrl = mongoDB;

module.exports = databaseUrl
