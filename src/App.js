import React, { Component, Fragment } from "react";
import axios from "axios";
import Fade from "react-reveal/Fade";

import "./reset.scss";
import "./App.scss";
import { BrowserRouter, Route, Link } from "react-router-dom";

import { Search } from "./components/Search/Search";
import { ToWatchList } from "./components/ToWatchList/ToWatchList";
import { WatchedList } from "./components/WatchedList/WatchedList";
import { MovieDetails } from "./components/MovieDetails/MovieDetails";
import { Filter } from "./components/Filter/Filter";

class App extends Component {
  state = {
    movieTitle: "",
    movieData: {},
    toWatchData: [],
    watchedData: [],
    movieDetails: {},
    showDetails: false,
    urlId: "",
    showList: false,
    search: true
  };

  componentDidMount() {
    this.fetchData();
    this.fetchWatchedData();
  }

  showSearchList = () => {
    this.setState({ showList: true });
  };

  hideSearchList = () => {
    this.setState({ showList: false });
  };

  fetchData() {
    axios
      .get(`https://towatchmovies.firebaseio.com/movies.json`)
      .then(responseData => {
        this.setState({
          toWatchData: this.formatData(responseData)
        });
      });
  }

  fetchWatchedData() {
    axios
      .get(`https://towatchmovies.firebaseio.com/watchedMovies.json`)
      .then(responseData => {
        this.setState({
          watchedData: this.formatData(responseData)
        });
      });
  }

  getMovieByTitle = foundTitle => {
    this.setState(
      {
        movieTitle: foundTitle
      },
      () => {
        axios
          .get(
            `http://www.omdbapi.com/?apikey=649e3e66&t=${this.state.movieTitle}`
          )
          .then(response => {
            this.setState(
              {
                movieData: response
              },
              () => {
                axios
                  .post(
                    `https://towatchmovies.firebaseio.com/movies.json`,
                    this.state.movieData
                  )
                  .then(() => {
                    this.fetchData();
                  });
              }
            );
          });
      }
    );
  };

  deleteMovie = movieId => {
    fetch(`https://towatchmovies.firebaseio.com/movies/${movieId}.json`, {
      method: "DELETE"
    }).then(() => this.fetchData());
  };

  deleteWatchedMovie = movieId => {
    fetch(
      `https://towatchmovies.firebaseio.com/watchedMovies/${movieId}.json`,
      {
        method: "DELETE"
      }
    ).then(() => this.fetchWatchedData());
  };

  moveToWatched = watchedMovie => {
    this.deleteMovie(watchedMovie.id);

    axios
      .post(
        `https://towatchmovies.firebaseio.com/watchedMovies.json`,
        watchedMovie
      )
      .then(() =>
        axios
          .get(`https://towatchmovies.firebaseio.com/watchedMovies.json`)
          .then(responseData => {
            this.setState({
              watchedData: this.formatData(responseData)
            });
          })
      );
  };

  showMovieDetails = id => {
    axios
      .get(`http://www.omdbapi.com/?apikey=649e3e66&i=${id}&plot=full`)
      .then(response =>
        this.setState(
          {
            movieDetails: response.data,
            showDetails: true,
            urlId: response.data.imdbID,
            search: false
          },
          () => console.log(this.state.urlId)
        )
      );
  };

  formatData(responseData) {
    const data = [];

    for (const item in responseData.data) {
      data.push({ ...responseData.data[item], id: item });
    }

    console.log(data);

    return data;
  }

  showSearch = () => {
    this.setState({ search: true });
  };

  render() {
    const {
      toWatchData,
      watchedData,
      showDetails,
      movieDetails,
      urlId,
      showList,
      search
    } = this.state;
    return (
      <BrowserRouter>
        <header>
          <div className="main-wrapper">
            <div id="header">
              <div className="half">
                <Link to="/">
                  <h3 id="logo" onClick={this.showSearch}>
                    Movie Watchlist
                  </h3>
                </Link>
              </div>
              <div className="half">
                {search && (
                  <Fade>
                    <Search
                      showSearchList={this.showSearchList}
                      showList={showList}
                      getMovieByTitle={this.getMovieByTitle}
                    />
                  </Fade>
                )}
              </div>
            </div>
          </div>
        </header>

        <Route exact path="/">
          <Fade>
            <Filter toWatchData={toWatchData} fetchData={this.fetchData} />
            <ToWatchList
              hideSearchList={this.hideSearchList}
              toWatchData={toWatchData}
              deleteMovie={this.deleteMovie}
              moveToWatched={this.moveToWatched}
              showMovieDetails={this.showMovieDetails}
            />

            <WatchedList
              watchedData={watchedData}
              deleteWatchedMovie={this.deleteWatchedMovie}
              showMovieDetails={this.showMovieDetails}
              hideSearchList={this.hideSearchList}
            />
          </Fade>
        </Route>
        <Route path={`/${urlId}`}>
          {showDetails && <MovieDetails movieDetails={movieDetails} />}
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
