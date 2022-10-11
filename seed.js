'use strict'

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(process.env.DB_URL);

const {Pokemon} = require('./models/Profile.js');

async function seed() {
    await Pokemon.create({
            Name: "ditto",
            ID: 132,
            Moves: [
                {
                    "move": {
                        "name": "transform",
                        "url": "https://pokeapi.co/api/v2/move/144/"
                    },
                }
            ],
          Types:  [
                {
                    "slot": 1,
                    "type": {
                        "name": "normal",
                        "url": "https://pokeapi.co/api/v2/type/1/"
                    }
                }
            ],
          Base_stat:  [
                {
                    "base_stat": 48,
                    "effort": 1,
                    "stat": {
                        "name": "hp",
                        "url": "https://pokeapi.co/api/v2/stat/1/"
                    }
                },
                {
                    "base_stat": 48,
                    "effort": 0,
                    "stat": {
                        "name": "attack",
                        "url": "https://pokeapi.co/api/v2/stat/2/"
                    }
                },
                {
                    "base_stat": 48,
                    "effort": 0,
                    "stat": {
                        "name": "defense",
                        "url": "https://pokeapi.co/api/v2/stat/3/"
                    }
                },
                {
                    "base_stat": 48,
                    "effort": 0,
                    "stat": {
                        "name": "special-attack",
                        "url": "https://pokeapi.co/api/v2/stat/4/"
                    }
                },
                {
                    "base_stat": 48,
                    "effort": 0,
                    "stat": {
                        "name": "special-defense",
                        "url": "https://pokeapi.co/api/v2/stat/5/"
                    }
                },
                {
                    "base_stat": 48,
                    "effort": 0,
                    "stat": {
                        "name": "speed",
                        "url": "https://pokeapi.co/api/v2/stat/6/"
                    }
                }
            ]
    });
    console.log('done seeding!');
    mongoose.disconnect();
}

seed();