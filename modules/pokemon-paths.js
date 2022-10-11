const Profile = require('../models/Profile.js');
const _ = require('underscore');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const PokemonPath = {};

PokemonPath.getAll = async (req, res) => {
    const pokemons = await Profile.find();
    res.status(201).json(pokemons);
};

PokemonPath.getOne = async (req, res) => {
    const id = req.params.id;
    const pokemon = await Profile.findById(id);
    res.send(pokemon);
};

PokemonPath.create = async (req, res) => {
    const { name } = req.body;
    const pokemon = await Profile.findOne({ name: name }).exec();
    res.send(pokemon);
};

PokemonPath.getTest = async (req, res) => {
    try {
        const { default: Pokedex } = await import('pokedex-promise-v2');
        const P = new Pokedex();
        const interval = {
            limit: 50,
            offset: 66
        }
        const obj = await P.getPokemonsList(interval);
        let randomSelections = _.sample(obj.results, 6);
        const pokemonToSearch = await Promise.all(randomSelections.map(async (pokemon) => {
            let data = await fetch(pokemon.url);
            let json = await data.json();
            let { name, id, types, stats, moves } = json;
            return { name: name, id: id, types: types, stats: stats, moves: moves };

        })); // [Promise<Object>, Promise<Object>, Promise<Object>] ----> Promise<Array>
        res.send(pokemonToSearch);
    } catch (error) {
        res.status(500).send(`Server error ${error}`)
    }
}

module.exports = PokemonPath;