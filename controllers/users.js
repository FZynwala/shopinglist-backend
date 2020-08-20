const { User, validate } = require('../models/userModel');
const mongoose = require('mongoose');


async function registerUser(req, res) {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send('User already registered.');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        await user.save();
        res.send(user);
    } catch(ex) {
        console.log(ex.message);
    }
};

module.exports = {
    registerUser
};
