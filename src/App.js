import React, { Component, Fragment } from "react";
import axios from "axios";
import Fade from "react-reveal/Fade";

import { Communicator } from "./Communicator";

import "./reset.scss";
import "./App.scss";
import { BrowserRouter, Route, Link } from "react-router-dom";

import { Search } from "./components/Search/Search";
import { MovieList } from "./components/MovieList/MovieList";

import { MovieDetails } from "./components/MovieDetails/MovieDetails";
import { Filter } from "./components/Filter/Filter";

class App extends Component {
  state = {
    movieTitle: "",
    movieData: {},
    toWatchData: [],
    filteredData: [],
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
    const urlExtension = window.location.pathname.slice(1);

    if (window.location.pathname !== "/") {
      this.showMovieDetails(urlExtension);
    }
  }

  showSearchList = () => {
    this.setState({ showList: true });
  };

  hideSearchList = () => {
    this.setState({ showList: false });
  };

  fetchData() {
    axios.get(Communicator.moviesToWatch).then(responseData => {
      this.setState({
        toWatchData: this.formatData(responseData),
        filteredData: this.formatData(responseData)
      });
    });
  }

  fetchWatchedData() {
    axios.get(Communicator.watchedMovies).then(responseData => {
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
          .get(`${Communicator.searchByTitle}${this.state.movieTitle}`)
          .then(response => {
            this.setState(
              {
                movieData: response
              },
              () => {
                axios
                  .post(Communicator.moviesToWatch, this.state.movieData)
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
    Communicator.delete(movieId).then(() => this.fetchData());
  };

  deleteWatchedMovie = movieId => {
    Communicator.deleteWatched(movieId).then(() => this.fetchWatchedData());
  };

  moveToWatched = watchedMovie => {
    this.deleteMovie(watchedMovie.id);

    axios.post(Communicator.watchedMovies, watchedMovie).then(() =>
      axios.get(Communicator.watchedMovies).then(responseData => {
        this.setState({
          watchedData: this.formatData(responseData)
        });
      })
    );
  };

  showMovieDetails = id => {
    axios.get(Communicator.movieDetails(id)).then(response =>
      this.setState({
        movieDetails: response.data,
        showDetails: true,
        urlId: response.data.imdbID,
        search: false
      })
    );
  };

  onFilter = data => {
    this.setState({
      filteredData: data
    });
  };

  resetFilter = () => {
    this.setState({
      filteredData: this.state.toWatchData
    });
  };

  formatData(responseData) {
    const data = [];

    for (const item in responseData.data) {
      data.push({ ...responseData.data[item], id: item });
    }

    return data;
  }

  showSearch = () => {
    this.setState({ search: true });
  };

  onClickedGenre = genre => {
    const filteredToWatchData = this.state.toWatchData.filter(movie => {
      return movie.data.Genre.toLowerCase().includes(genre.toLowerCase());
    });
    this.setState({
      filteredData: filteredToWatchData
    });
  };

  render() {
    const {
      toWatchData,
      watchedData,
      showDetails,
      movieDetails,
      urlId,
      showList,
      search,
      filteredData
    } = this.state;

    return (
      <BrowserRouter>
        <Search
          search={this.state.search}
          showSearch={this.showSearch}
          showSearchList={this.showSearchList}
          showList={showList}
          getMovieByTitle={this.getMovieByTitle}
        />

        <Route exact path="/">
          <Fade>
            <Filter
              toWatchData={toWatchData}
              fetchData={this.fetchData}
              onFilter={this.onFilter}
              resetFilter={this.resetFilter}
              hideSearchList={this.hideSearchList}
            />
            <MovieList
              onClickedGenre={this.onClickedGenre}
              hideSearchList={this.hideSearchList}
              toWatchData={filteredData}
              deleteMovie={this.deleteMovie}
              moveToWatched={this.moveToWatched}
              showMovieDetails={this.showMovieDetails}
              header={"To Watch"}
            />

            <MovieList
              hideSearchList={this.hideSearchList}
              toWatchData={watchedData}
              deleteMovie={this.deleteWatchedMovie}
              showMovieDetails={this.showMovieDetails}
              header={"Watched"}
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
