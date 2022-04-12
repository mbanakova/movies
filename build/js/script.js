"use strict";

const API_KEY = 'd440f9d3';
$(document).ready(() => {
  $('#searchText').focus();
  $('#search-form').on('submit', e => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios.get(`http://www.omdbapi.com/?s=${searchText}&apikey=${API_KEY}`).then(response => {
    console.log(response.data.Search);
    let movies = response.data.Search;
    let output = '';
    $.each(movies, (index, movie) => {
      output += `
          <div class="card">
            <div class="card__poster"  onclick="movieSelected('${movie.imdbID}')">
              <img src="${movie.Poster}" alt="${movie.Title}"></div>
              <h5 class="card__title">${movie.Title}</h5>
              <a class="button" onclick="movieSelected('${movie.imdbID}')">More info</a> 
          </div>
          `;
    });
    $('#movies').html(output);
  }).catch(error => {
    throw new Error(error);
  });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  axios.get(`http://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`).then(response => {
    console.log(response.data);
    let movie = response.data;
    let output = '';
    let starring = movie.Actors.split(",");
    let actors = '';
    $.each(starring, (_, actor) => {
      actors += `
          <li class="actor">${actor.trim()}</li>
          `;
    });
    output += `
        <div class="movie">
          <div class="movie__img-wrap">
            <a class="movie__poster" href="http://imdb.com/title/${movie.imdbID}">
              <img src="${movie.Poster}" alt="${movie.Title}" class="thumbnail">
            </a>
            <div class="movie__buttons-wrap">
              <a class="button" href="http://imdb.com/title/${movie.imdbID}" target="_blank">imdb</a>
              <a class="button button--secondary" href="index.html" target="_blank">go back</a>
            </div>
          </div>

          <div class="movie__description">
            <h1 class="movie__title">${movie.Title} (${movie.Year})</h1>
            <p class="movie__plot">${movie.Plot}</p> 
          </div>

          <ul class="movie__about">
            <li class="movie__about-item"><span class="marker">Rated:</span><span class="info">${movie.Rated}</span></li>
            <li class="movie__about-item"><span class="marker">Genre:</span><span class="info">${movie.Genre}</span></li> 
            <li class="movie__about-item"><span class="marker">Director:</span><span class="info">${movie.Director}</span></li>
            <li class="movie__about-item"><span class="marker">Writer:</span><span class="info">${movie.Writer}</span></li>
            <li class="movie__about-item"><span class="marker">Runtime:</span><span class="info">${movie.Runtime}</span></li>
            <li class="movie__about-item"><span class="marker">Country:</span><span class="info">${movie.Country}</span></li>
            <li class="movie__about-item"><span class="marker">Released:</span><span class="info">${movie.Released}</span></li>
            <li class="movie__about-item"><span class="marker">BoxOffice:</span><span class="info">${movie.BoxOffice}</span></li>
          </ul>

          <div class="movie__rates">
            <h3 class="movie__rates-imbd">⭐ ${movie.imdbRating}</h3>
            <h3 class="movie__votes">on ${movie.imdbVotes} votes</h3>
          </div>

          <div class="movie__starring">
            <h3>Starring:</h3><ul class="info">${actors}</ul>
          </div>
        </div>
          `;
    $('#movie').html(output);
  }).catch(error => {
    throw new Error(error);
  });
}
//# sourceMappingURL=script.js.map
