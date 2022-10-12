const { Profile, Pokemon } = require('../models/Profile.js');
const _ = require('underscore');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

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

PokemonPath.find = async (req, res) => {
    const { name } = req.body;
    const pokemon = await Profile.findOne({ name: name }).exec();
    res.send(pokemon);
};

PokemonPath.searchForPokemon = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { default: Pokedex } = await import('pokedex-promise-v2');
        const P = new Pokedex();
        const pokemon = await P.getPokemonByName(name.toLowerCase());
        res.send(pokemon)
    } catch (err) {
        next(err)
    }
}

PokemonPath.savePokemon = async (req, res, next) => {
    try {
        const { pokemon: { name, id, types, stats, moves }, userName } = req.body;
        const pokeDoc = Pokemon.create({ Name: name, ID: id, Types: types || [], Stats: stats || [], Moves: moves || [] })
        const prof = await Profile.updateOne({ Name: userName }, { $push: { Pokemon: pokeDoc } });
        res.send(prof);
    } catch (err) {
        next(err)
    }
}

PokemonPath.createProfile = async (req, res) => {
    try {
        const { default: Pokedex } = await import('pokedex-promise-v2');
        const P = new Pokedex();
        const interval = {
            limit: 150,
            offset: 0
        }
        const obj = await P.getPokemonsList(interval);
        let randomSelections = _.sample(obj.results, 6);
        const pokemonToSearch = await Promise.all(randomSelections.map(async (pokemon) => {
            let data = await fetch(pokemon.url);
            let json = await data.json();
            let { name, id, types, stats, moves } = json;
            let moveNames = moves.reduce((acc, move) => {
                acc.push(move.move.name);
                return acc;
            }, []);
            return Pokemon.create({ Name: name, ID: id, Types: types, Stats: stats, Moves: moveNames });

        })); // [Promise<Object>, Promise<Object>, Promise<Object>] ----> Promise<Array>
        const mongoData = await Profile.create({
            Name: req.query.name,
            Pokemon: pokemonToSearch
        })
        res.send(mongoData);
    } catch (error) {
        res.status(500).send(`Server error ${error}`)
    }
}

PokemonPath.trade = async (req, res) => {
    const { pokeWanted } = req.body;
    res.send(pokeWanted);
}

PokemonPath.findPokeForTrade = async (req, res, next) => {
    const { pokeWanted } = req.body;
    const userWithPokeWanted = Profile
        .find({ 'Pokemon.Name': pokeWanted.toLowerCase() })
        .cursor({ transform: (doc) => doc.Pokemon });
    const out = await userWithPokeWanted.next();
    res.send(out)
}

const createPokedex = async (range) => {
    const { default: Pokedex } = await import('pokedex-promise-v2');
    return new Pokedex();
}

module.exports = PokemonPath;