// server
require('dotenv').config();
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8081;

const userRoutes = require('./routes/user');
const apiRoutes = require('./routes/api');

// handle cors
const corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));

// parsing request type application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// reduce size body response  -> improve speed
app.use(compression());

// routing
app.use('/users', userRoutes);
app.use('/api', apiRoutes);

app.listen(port, () => {
    console.log('Running on port : ', port);
});