'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherJSON = require('./data/weather.json');

const server = express();
server.use(cors());

const PORT = process.env.PORT;

server.get('/weather', getWeather);

server.use('*', (req, res) =>
  res.status(404).send('Page not found'));

function getWeather(req, res) {
  let searchQuery = req.query.searchQuery;

  const city = weatherJSON.find(city =>
    city.city_name.toLowerCase() === searchQuery.toLowerCase());


  {
    const weatherArray = city.data.map(day =>
      new Forecast(day)
    );

    res.status(200).send(weatherArray);
  }

  {
    errorHandler(res);
  }
}

function errorHandler(res) {
  res.status(500).send('Something went Wrong');
}


function Forecast(item) {
  this.valid_date = item.valid_date;
  this.description = item.weather.description;
}

server.listen(PORT, () => console.log(`I'm listening on ${PORT}`));


