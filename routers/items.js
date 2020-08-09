const express = require('express');
const { postItemToList, getItemFromList, deleteItem, updateItem } = require('../controllers');

const router = express.Router();

router.post('/', postItemToList);
router.get('/:userId', getItemFromList);
router.delete('/:id', deleteItem);
router.put('/:id', updateItem);

module.exports = router;