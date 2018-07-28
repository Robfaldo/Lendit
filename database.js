var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const possibleUrls = {
    'test': `mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247101.mlab.com:47101/lendit-test`,
    'production': `mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247171.mlab.com:47171/lendit-prod`,
    'development': `mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247001.mlab.com:47001/lendit-dev`
}
const db_env = process.env.DB_ENV || 'production';
let databaseUrl = possibleUrls[db_env];

module.exports = databaseUrl;
