
'use strict';
const express = require('express');
const server = express();
const cors = require('cors');
server.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;


const getWeather = require('./contoller/forecast.controler');
const getMovies = require('./contoller/movies.controler');

server.get('/weather', getWeather);


server.get('/movies', getMovies);

server.use('*', (req, res) => res.status(404).send('page not found'));
server.listen(PORT, () => console.log(`hello from the port num ${PORT}`));
