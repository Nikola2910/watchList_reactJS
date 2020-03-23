import React, { Component, Fragment } from "react";
import axios from "axios";

import "./reset.scss";
import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";

import { Search } from "./components/Search/Search";
import { ToWatchList } from "./components/ToWatchList/ToWatchList";

class App extends Component {
  state = { movieTitle: "", movieData: {}, toWatchData: [] };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    axios
      .get(`https://towatchmovies.firebaseio.com/movies.json`)
      .then(responseData => {
        this.setState({
          toWatchData: this.formatData(responseData)
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

  formatData(responseData) {
    const data = [];

    for (const item in responseData.data) {
      data.push({ ...responseData.data[item], id: item });
    }

    console.log(data);

    return data;
  }

  render() {
    return (
      <Fragment>
        <header>
          <div className="main-wrapper">
            <div id="header">
              <h3 id="logo">Movie Watchlist</h3>
              <Search getMovieByTitle={this.getMovieByTitle} />
            </div>
          </div>
        </header>
        <ToWatchList
          toWatchData={this.state.toWatchData}
          deleteMovie={this.deleteMovie}
        />
      </Fragment>
    );
  }
}

export default App;
