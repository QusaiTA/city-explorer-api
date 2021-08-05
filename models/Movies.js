class Movies {

  constructor(movie){
    this.popularity = movie.popularity;
    this.release_date = movie.release_date;
    this.title = movie.title;
    this.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    this.vote_average = movie.vote_average;
    this.vote_count = movie.vote_count;


  }
}

module.exports = Movies;
