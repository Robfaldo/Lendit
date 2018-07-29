const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  itemName: {
    type: String
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  itemDescription: {
    type: String
  }
});

var Item = mongoose.model('Item', ItemSchema);

Item.findAllAndReverse = function() {
  return Item.find().sort({dateAdded:-1})
}

module.exports = Item;
