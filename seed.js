'use strict'

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DB_URL);

const {Pokemon, Profile} = require('./models/Profile.js');

async function seed() {
    const pokeDoc = await Pokemon.create({id: 123, name: 'ditto', types: ['normal'], stats: [], moves: ['transform']});
    await Profile.create({
        Name: 'Ben',
        Pokemon: [pokeDoc]
    })
    console.log('done seeding!');
    mongoose.disconnect();
}

seed();