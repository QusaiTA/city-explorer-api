
'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherKEY = process.env.WEATHER_BIT_KEY;
const weatherURL = process.env.WEATHER_BIT_URL;
const { default: axios } = require('axios');
const server = express();
server.use(cors());
const PORT = process.env.PORT;
const movieKEY= process.env.MOVIE_API_KEY;
const movieURL= process.env.MOVIE_API_URL;


server.get('/weather', forcastMethod);
server.get('/movies', movieGetterMethod);

async function forcastMethod(req,res){
  let { lat, lon } = req.query;
  const url=`${weatherURL}?key=${weatherKEY}&lon=${lon}&lat=${lat}`;
  const gettingWeather=await axios.get(url);
  const weatherArray=gettingWeather.data.data.map(item=>new Forecast(item));
  console.log(weatherArray);

  res.json(weatherArray);
}
class Forecast {
  constructor(value) {
    this.valid_date = value.valid_date;
    this.description = value.weather.description;
  }
}

async function movieGetterMethod(req,res){

  let searchQuery = req.query.searchQuery;
  const url =`${movieURL}?api_key=${movieKEY}&query=${searchQuery}`;
  const gettingMovie =await axios.get(url);


  const moviesArray=gettingMovie.data.results.map(item=>new Movies(item));
  console.log(moviesArray);
  res.json(moviesArray);


}

class Movies {

  constructor(value){
    this.popularity = value.popularity;
    this.release_date = value.release_date;
    this.title = value.title;
    this.vote_average = value.vote_average;
    this.vote_count = value.vote_count;


  }
}
server.use('*', (req, res) => res.status(404).send('page not found'));
server.listen(PORT, () => console.log(`hello from the port num ${PORT}`));
