const PokemonPath = {};
const { response, request } = require('express');
const Profile = require('../models/Profile.js');


PokemonPath.getAll = async (req,res) => {
    const pokemons = await Profile.find();
    res.status(201).json(pokemons);
};

PokemonPath.getOne = async (req,res) => {
    const id = req.params.id;
    const pokemon = await Profile.findById(id);
    res.send(pokemon);
};

PokemonPath.create = async (req,res) => {
    const {name} = req.body;
    const pokemon = await Profile.findOne({name: name}).exec();
    res.send(pokemon);
};

PokemonPath.getTest = async (req,res) => {
    try{
    const {default: Pokedex} = await import('pokedex-promise-v2');
    const P = new Pokedex();
    const pokemon = await P.getPokemonByName('ditto');
    res.send(pokemon);
    }catch(error){
        res.status(500).send(`Server error ${error}`)
    }
}

module.exports = PokemonPath;