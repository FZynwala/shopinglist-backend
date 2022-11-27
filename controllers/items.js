const { Item } = require('../models/itemModel');
const moment = require('moment');
const tz = require('moment-timezone');
const { encrypt, decrypt } = require('./crypto');
require('moment/locale/pl.js');

async function postItemToList(req, res) {
    const date = moment(new Date()).tz('Europe/Warsaw').format('ll');

    const item = new Item({
        content: req.body.content,
        isDone: req.body.isDone,
        userId: req.user._id,
        create_date: date,
    });

    try {
        const result = await item.save();
        res.send(result);
    } catch (err) {
        res.send(err);
    }
}

async function getItemFromList(req, res) {
    try {
        const items = await Item.find({ userId: req.user._id });

        if (!items) {
            return res.status(404).send('There is no item for given user');
        }

        res.send(items);
    } catch (err) {
        console.log(err);
    }
}

async function deleteItem(req, res) {
    try {
        const item = await Item.findByIdAndRemove(req.params.id);

        if (!item) return res.status(404).send('The task with the given ID does not exist');

        res.send(item);
    } catch (err) {
        console.log(err.message);
    }
}

async function updateItem(req, res) {
    let item = await Item.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        { new: true },
    );

    res.send(item);
}

module.exports = {
    postItemToList,
    getItemFromList,
    deleteItem,
    updateItem,
};
