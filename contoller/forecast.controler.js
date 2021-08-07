const axios =require('axios');
const Forecast = require('../models/Forecast');
const weatherKEY = process.env.WEATHER_BIT_KEY;
const weatherURL = process.env.WEATHER_BIT_URL;

let myMemory = {};


async function forcastMethod(req,res){
  let { lat, lon } = req.query;
  if (myMemory[lat,lon] !== undefined) {
    console.log('hello from cashing');
    res.send(myMemory[lat,lon]);
  } else {
    console.log('hello from weatherAPI');
    const url=`${weatherURL}?key=${weatherKEY}&lon=${lon}&lat=${lat}`;
    const gettingWeather=await axios.get(url);
    const weatherArray=gettingWeather.data.data.map(item=>new Forecast(item));
    console.log(weatherArray);

    res.json(weatherArray);
  }
}
module.exports = forcastMethod;
