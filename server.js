'use strict'

require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const express = require('express');
const PokemonPath = require('./modules/pokemon-paths.js');

const mongoose = require('mongoose');

const app = express();
app.use(cors());

//middleware
app.use(express.json());

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error'));
db.once('open', function () {
    console.log('Mongoose is connected');
});

const Profile = require('./models/Profile.js');

//Endpoints
app.get('/', (request, response) => {
    response.send('test request recieved')
})

app.get('/pokedex', PokemonPath.getAll);
app.get('/pokedex/:id', PokemonPath.getOne);
app.post('/pokedex', PokemonPath.find);
app.get('/create', PokemonPath.createProfile);
app.post('/trade', PokemonPath.trade);
app.get('/register', async (req, res, next) => {
    // authentication logic here
    let tok = req.headers.authorization.split(' ')[1];
    try {
        jwt.verify(tok, process.env.CLIENT_SECRET, (err, decoded) => {
            if (!err) {
                res.redirect('/create?name=' + decoded)
            } else if (err) throw 'Something is not right'
        })
    } catch (error) {
        next(error)
    }
})


// catch all
app.get('*', (req, res) => {
    res.statusMessage(404).send('Not found');
});

//error handling
app.use((error, req, res) => {
    res.status(500).send(error.message);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
