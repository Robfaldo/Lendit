var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const databaseUrl = require('../../database')

require('../../models/item');
require('../../models/user');

const Item = mongoose.model('Item');
const User = mongoose.model('User');

mongoose.connect(databaseUrl, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get('/items', async (req, res) => {
    const items = await Item.findAllAndReverse();
    res.json(items)
});

router.post('/items', async (req, res, next) => {
    const itemToCreate = {
      itemName: req.body.itemName,
      itemDescription: req.body.itemDescription,
      image: req.body.image,
      owner: req.body.owner
    };
    const newItem = new Item(itemToCreate);
    await newItem.save();
    res.send({
        success: true,
        message: 'Listing created',
        id: newItem["_id"]
    });
});

router.delete('/items', async (req, res, next) => {
    const itemIdToDelete = req.body._id;
    await Item.findByIdAndRemove(itemIdToDelete);
    next();
});

router.put('/items/:item_id', async (req, res, next) => {
  const borrowerId = req.body.borrowerId
  const itemToUpdate = await Item.findOne({ _id: req.params.item_id });
  const itemOwner = await User.findOne({ _id: itemToUpdate.owner });

  const isUpdated = Item.updateBorrower(
    itemToUpdate._id,
    borrowerId
  );
  await User.updateKarmaPoints(itemOwner, 1)
  if (isUpdated) return res.sendStatus(200);
  next();
});

module.exports = router;
