const express = require('express');
const { postItemToList, getItemFromList, deleteItem, updateItem } = require('../controllers/items');

const router = express.Router();

router.get('/', (req, res) => res.send('I am healthy!'));

module.exports = router;
