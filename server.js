const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const calculations = require('./routes/api/calculations');

const {connectDB} = require('./db');
require('dotenv').config();

const app = express();
const port = 4000;

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
)

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());

connectDB();

//200 success
//400 error user based
//404 not found
//402 unauthorized
//500 server error
app.use('/v1/calculations', calculations);
app.listen(port, console.log(`API in listening on port ${port}`));

//http://localhost:4000/

