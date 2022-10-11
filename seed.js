'use strict'

const mongoose = require('mongoose');

require('dotenv').config();

const init = require('../server');

mongoose.connect(process.env.DB_URL);

const {Pokemon, Profile} = require('./models/Profile.js');

async function seed() {
    // await Profile.create({
    //     Name: 'Ben',
    //     Pokemon: init.getTest('', );
    // })
    console.log('done seeding!');
    mongoose.disconnect();
}

seed();