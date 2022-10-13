'use strict'

const mongoose = require('mongoose');
const {Schema} = mongoose;

const PokemonSchema = new Schema({
    name: { type: String, required: true },
    id: { type: Number, required: true },
    types: { type: Array, required: false },
    stats: { type: Array, required: false },
    moves: { type: Array, required: false },
});


const profileSchema = new Schema({
    Name: {type: String, required: true},
    Pokemon: {type: [PokemonSchema], required: true},
});


const Profile = mongoose.model('profile', profileSchema);
const Pokemon = mongoose.model('pokemon', PokemonSchema);

module.exports = {Profile, Pokemon};

