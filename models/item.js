const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String
  }
});

module.exports = mongoose.model('Item', ItemSchema);
