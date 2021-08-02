'use strict';


const express = require('express');
const app = express(); // initialize your express app instance
const cors = require('cors');
require('dotenv').config();

const weatherData = require('./data/weather.json');
const { Server } = require('http');
Server.use(cors());

const PORT = process.env.PORT;


app.get('/',
  (request, response) => { // callback function of what we should do with our request
    response.send('Hello World 🥳'); // our endpoint function response
  });

app.listen(3001);
