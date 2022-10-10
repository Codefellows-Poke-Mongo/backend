'use strict'

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DB_URL);

const {Pokemon} = require('./models/Profile.js');

async function seed() {
    await Pokemon.create({
        
    });
}