var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

require('../../models/item');
const Item = mongoose.model('Item');


mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_Password}@ds247101.mlab.com:47101/lendit-test`);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

router.get('/items', async (req, res) => {
    const items = await Item.findAllAndReverse();
    res.json(items)
});


router.post('/items', async (req, res, next) => {
    const itemToCreate = { itemName: req.body.itemName };
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

module.exports = router;
