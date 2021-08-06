const movieKEY= process.env.MOVIE_API_KEY;
const movieURL = process.env.MOVIE_API_URL;
const axios =require('axios');
const Movies = require('../models/Movies');

let myMemory = {};

async function movieGetterMethod(req,res){
  let searchQuery = req.query.searchQuery;
  if (myMemory[searchQuery] !== undefined) {

    res.send(myMemory[searchQuery]);
  } else {

    console.log(req);
    searchQuery = searchQuery.toLowerCase();
    const url =`${movieURL}?api_key=${movieKEY}&query=${searchQuery}`;
    const gettingMovie =await axios.get(url);
    console.log(gettingMovie);

    const moviesArray=gettingMovie.data.results.map(item=>new Movies(item));
    console.log(gettingMovie.data.results);
    res.json(moviesArray);
  }

}
module.exports = movieGetterMethod;
