const mongoose = require('mongoose');

const connectToAndDropDatabase = async () => {
  await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247001.mlab.com:47101/lendit-test`);
  await mongoose.connection.db.dropDatabase();
}

const disconnectFromDatabase = async () => {
  await mongoose.disconnect();
}

module.exports = {
  connectToAndDropDatabase: connectToAndDropDatabase,
  disconnectFromDatabase: disconnectFromDatabase
}
