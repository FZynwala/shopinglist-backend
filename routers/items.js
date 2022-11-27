const express = require('express');
const { postItemToList, getItemFromList, deleteItem, updateItem } = require('../controllers/items');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, postItemToList);
router.get('/', auth, getItemFromList);
router.delete('/:id', auth, deleteItem);
router.put('/:id', auth, updateItem);

module.exports = router;
