const express = require('express');
const mongoose = require('mongoose');
const itemModel = require('../models/itemModel');

const router = express.Router();

router.post('/', async (req, res) => {
    console.log(req.body.create_date);
    const item = new itemModel.Task({
        content: req.body.content,
        isDone: req.body.isDone,
        userId: req.body.userId,
        create_date: req.body.create_date
    });
    console.log(item);
    try {
        const result = await item.save();
        res.send(result);
    } catch (err) {
        res.send(err);
    }

});

router.get('/:userId', async (req, res) => {
    try {
        const items = await itemModel.Item.find({userId: req.params.userId});
        console.log(items);
        if(!items) {
            console.log(`Hello from if no items`);
            return res.status(404).send('There is no item for given user');
        }
        
        res.send(items);
        
    } catch (err) {
        console.log(err);
    }

});

router.delete('/:id', async (req, res) => {
    console.log('hello from delete');
    const item = await taskModel.Task.findByIdAndRemove(req.params.id);
    console.log(item);
    if (!item) return res.status(404).send('The task with the given ID does not exist');

    res.send(item);
});

router.put('/:id', async (req, res) => {
    let item = await taskModel.Task.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true });
    
    console.log("Hello from PUT");
 
    res.send(item);
});

module.exports = router;