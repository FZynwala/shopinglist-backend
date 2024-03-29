const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATE_KEY);
    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(5),
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
