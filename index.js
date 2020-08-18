const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const connectdb = require('./connectDB');
const items = require('./routers/items');
const { config } = require('./config/config');

const app = express();

require('./prod')(app);

config();
connectdb.connectToDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let allowCrossDomain = function(req, res, next) {
    //res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Origin', "https://fzynwala.github.io/shopinglist-frontend/");
    res.header('Access-Control-Allow-Methods', "PUT");
    res.header('Access-Control-Allow-Methods', "OPTIONS");
    res.header('Access-Control-Allow-Methods', "POST");
    res.header('Access-Control-Allow-Methods', "GET");
    res.header('Access-Control-Allow-Methods', "DELETE, PUT");
    res.header('Access-Control-Request-Headers', "Content-Type");
    res.header('Access-Control-Allow-Headers', "Content-Type, Origin, X-Requested-With, Accept");
    res.header('Vary', "Origin");

    if (req.method === 'OPTIONS') {
      res.send(200);
    } else {
        next();
    }

    //next();
  };

app.use(allowCrossDomain);
app.use(cookieParser())
app.use('/items', items);


const port = process.env.PORT || 8000;
app.listen(port);