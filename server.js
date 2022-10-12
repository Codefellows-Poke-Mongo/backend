'use strict'

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const PokemonPath = require('./modules/pokemon-paths.js');
const verifyUser = require('./auth.js')

const mongoose = require('mongoose');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(verifyUser);

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error'));
db.once('open', function () {
    console.log('Mongoose is connected');
});

//Endpoints
app.get('/', (request, response) => {
    response.send('test request recieved')
})

app.get('/pokedex', PokemonPath.getAll);
app.get('/pokedex/:id', PokemonPath.getOne);
app.post('/pokedex', PokemonPath.find);
app.get('/create', PokemonPath.createProfile);
app.post('/trade', PokemonPath.findPokeForTrade);
app.get('/register', PokemonPath.createProfile);


// catch all
app.get('*', (req, res) => {
    res.status(404).send('Not found');
});

//error handling
app.use((error, req, res) => {
    res.status(500).send(error.message);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
