const express = require('express');
const { registerUser, loginUser } = require('../controllers/users');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
//router.get('/', getUsers);

module.exports = router;
