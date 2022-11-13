const mongoose = require('mongoose');

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('Connected to MongoDB...');
    } catch (err) {
        console.error('Connection failed...', err);
    }
}

module.exports.connectToDB = connectToDB;