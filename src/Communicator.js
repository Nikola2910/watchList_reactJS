// File with firbase and api url-s and methods for deleting movies

class Communicator {
  static moviesToWatch = `https://towatchmovies.firebaseio.com/movies.json`;
  static watchedMovies = `https://towatchmovies.firebaseio.com/watchedMovies.json`;
  static searchByTitle = `http://www.omdbapi.com/?apikey=649e3e66&t=`;

  static delete = movieId =>
    fetch(`https://towatchmovies.firebaseio.com/movies/${movieId}.json`, {
      method: "DELETE"
    });

  static deleteWatched = movieId =>
    fetch(
      `https://towatchmovies.firebaseio.com/watchedMovies/${movieId}.json`,
      {
        method: "DELETE"
      }
    );

  static movieDetails = id =>
    `http://www.omdbapi.com/?apikey=649e3e66&i=${id}&plot=full`;
}

export { Communicator };
