const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String
    },
    create_date: {
        
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports.Item = Item;