import express from 'express';
import path from 'path';
import logger from 'morgan';
import mongoose from 'mongoose'
require('dotenv').config()
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static('.' + '/uploads'));



// CORS
app.use(function (req, res, next) {
    // Websites allowed to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods to be allowed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers to be allowed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pass to next layer of middleware
    res.setHeader('Content-Type', 'application/json');
    // setting header content-type application/json
    next();

});

const sendResponse = (req, res, next) => {
    res.sendResponse = (body, message, code) => {
        let response = {};
        response['statusCode'] = code || 200;
        response['status'] = true;
        response['message'] = message || 'success';
        response['body'] = body;
        res.json(response);
    };
    next();
};

const sendError = (req, res, next) => {
    res.sendError = (err, message, code) => {
        let response = {};
        response['status'] = false;
        response['statusCode'] = code || 500;
        response['message'] = message || err.message;
        response['body'] = err;
        res.json(response);
    };
    next();
};

app.use(sendError);
app.use(sendResponse);


// API routes defined
const userRouter = require('./routes/users');
app.use(`/user`, userRouter);


const trainRouter = require('./routes/train');
app.use(`/train`, trainRouter);

const bookingRouter = require('./routes/booking');
app.use(`/ticket`, bookingRouter);



app.get('/', (req, res) => {
    res.send('Working...!')
})

mongoose.connect(process.env.MONGOURL, {
    useUnifiedTopology: true, useNewUrlParser: true
}).
    catch(error => console.log(error));


app.listen(process.env.PORT, () => {
    console.log(`app listening at http://localhost:${process.env.PORT}`)
})