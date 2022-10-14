'use strict'

const mongoose = require('mongoose');
const _ = require('underscore');

require('dotenv').config();

const { updatePokemon } = require('./modules/pokemon-paths')

mongoose.connect(process.env.DB_URL);

const { Pokemon, Profile } = require('./models/Profile.js');

async function seedPokemon() {
    const { default: Pokedex } = await import('pokedex-promise-v2');
    const P = new Pokedex();
    for (const num of _.range(1, 151)) {
        let { name, id, types, stats, moves } = await P.getPokemonByName(num);
        await Pokemon.create({ name, id, types, stats, moves });
    }

    mongoose.disconnect();
}

async function seedProfiles() {
    let pokemon = await Pokemon.find({})
    for (const person of ['Mehtab', 'Ben', 'Max', 'Jose', 'Dolly Parton', 'Steve McQueen', 'Helmut Berger']) {
        await Profile.create({ Name: person, Pokemon: _.sample(pokemon, 6) });
    }
    
    mongoose.disconnect();
}

seedProfiles();