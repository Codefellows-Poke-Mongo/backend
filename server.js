'use strict'

require('dotenv').config();

const cors = require('cors');
const express = require('express');

const mongoose = require('mongoose');

const app = express();
app.use(cors());

//middleware
app.use(express.json());

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error'));
db.once('open', function () {
    console.log('Mongoose is connected');
});

const Profile = require('./models/Profile.js');

//Endpoints
app.get('/', (request, response) => {
    response.send('test request recieved')
})




// catch all
app.get('*', (req, res) => {
    res.statusMessage(404).send('Not found');
});

//error handling
app.use((error, req, res) => {
    res.status(500).send(error.message);
});


