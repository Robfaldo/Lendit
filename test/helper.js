const mongoose = require('mongoose');
const User = require('../models/user');
const Item = require('../models/item');

const connectToAndDropDatabase = async () => {
  await mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247001.mlab.com:47101/lendit-test`);
  await mongoose.connection.db.dropDatabase();
}

const disconnectFromDatabase = async () => {
  await mongoose.disconnect();
}

const createUser = async (userToCreate) => {
  const user = new User({
    'firstName': userToCreate.firstName,
    'lastName': 'testLastName',
    'email': "testemail@gmail.com",
    'username': "testUserName",
    'password': "validTestPassword"
  });
  return await user.save();
}

module.exports = {
  connectToAndDropDatabase: connectToAndDropDatabase,
  disconnectFromDatabase: disconnectFromDatabase,
  createUser: createUser
}
