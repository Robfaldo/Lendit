var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const databaseUrl = require('../../database')

require('../../models/item');
const Item = mongoose.model('Item');

mongoose.connect(databaseUrl);
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
      owner: req.body.owner
    };
    const newItem = new Item(itemToCreate);
    await newItem.save();
    res.send({
        success: true,
        message: 'Listing created'
    });
    next();
});

router.delete('/items', async (req, res, next) => {
    const itemIdToDelete = req.body._id;
    await Item.findByIdAndRemove(itemIdToDelete);
    next();
});

router.put('/items/:item_id', async (req, res, next) => {
  const isUpdated = Item.updateBorrower(
    req.params.item_id,
    req.body.borrowerId
  );
  if (isUpdated) return res.sendStatus(200);
  next();
});

module.exports = router;
