const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectdb = require('./connectDB');
const items = require('./routers/items');
const users = require('./routers/users');
const health = require('./routers/health');
// const { config } = require('./config/config');
require('dotenv').config();

const app = express();

require('./prod')(app);

// config();
connectdb.connectToDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let allowCrossDomain = function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Origin', 'https://fzynwala.github.io');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST, GET, OPTIONS');
    res.header('Access-Control-Request-Headers', 'Content-Type');
    res.header('Access-Control-Expose-Headers', 'x-auth-token');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Accept, x-auth-token');
    res.header('Vary', 'Origin');

    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }

    //next();
};

app.use(allowCrossDomain);
app.use(cookieParser());
app.use('/items', items);
app.use('/users', users);

const port = process.env.PORT || 8000;
app.listen(port);
