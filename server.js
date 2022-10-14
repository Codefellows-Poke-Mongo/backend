'use strict'

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const PokemonPath = require('./modules/pokemon-paths.js');
const verifyUser = require('./auth.js')

const mongoose = require('mongoose');
const { Pokemon } = require('./models/Profile.js');

const app = express();
//middleware
app.use(cors());
app.use(express.json());

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

app.use('/register', verifyUser, PokemonPath.createProfile);
app.get('/pokedex', PokemonPath.getAll);
app.get('/pokedex/:id', PokemonPath.getOne);
app.get('/pokedex', PokemonPath.find);

app.post('/trade', PokemonPath.findPokeForTrade);
app.post('/search', PokemonPath.searchForPokemon);
app.post('/save', PokemonPath.savePokemon);


// app.get('/create', PokemonPath.createProfile);

// catch all
app.get('*', (req, res) => {
    res.status(404).send('Not found');
});

//error handling
app.use((error, req, res) => {
    res.send(error.message);
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
// const io = require('socket.io')(server, {
//     cors: {
//       origin: 'http://localhost:3000',
//       methods: ['GET', 'POST'],
//       credentials: true
//     }
//   });

//   io.on('connect', socket => {
//     socket.on('connect', name => {
//       console.log(socket.connected)
//     })
//     socket.emit('connect', 'Welcome!');
//     socket.on('disconnect', () => {
//       socket.broadcast.emit('user-disconnected', users[socket.id]);
//       delete users[socket.id]
//     })
//   });
