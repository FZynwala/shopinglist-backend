const { User, validateUser } = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');

async function registerUser(req, res) {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        await user.save();
        res.send(user);
    } catch (ex) {
        console.log(ex.message);
    }
}

async function loginUser(req, res) {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);

    res.send(token);
}

function validate(request) {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5),
    });

    return schema.validate(request);
}

module.exports = {
    registerUser,
    loginUser,
};
