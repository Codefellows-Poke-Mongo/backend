'use strict'

const mongoose = require('mongoose');
const {Schema} = mongoose;

const PokemonSchema = new Schema({
    Name: { type: String, required: true },
    ID: { type: Number, required: true },
    Types: { type: Array, required: true },
    Stats: { type: Array, required: true },
    Moves: { type: Array, required: true },
});


const profileSchema = new Schema({
    Name: {type: String, required: true},
    Pokemon: {type: [PokemonSchema], required: true},
});


const Profile = mongoose.model('profile', profileSchema);
const Pokemon = mongoose.model('pokemon', PokemonSchema);

module.exports = {Profile, Pokemon};

