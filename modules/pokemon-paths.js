const { response, request } = require('express');
const Profile = require('./models/Profile.js');

PokemonPath.getAll = async (req,res) => {
    const pokemons = await Profile.find();
    response.status(201).json(pokemons);
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

