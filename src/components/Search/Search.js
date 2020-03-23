import React, { Component } from "react";
import axios from "axios";
import uuid from "react-uuid";
import add from "../../img/plus.png";
import loader from "../../img/loader.gif";

import "./Search.scss";

class Search extends Component {
  constructor(props) {
    super(props);
    this.cancel = "";
  }

  state = {
    searchTerm: "",
    results: {},
    loading: false
  };

  fetchSearchResults = searchTerm => {
    const searchUrl = `http://www.omdbapi.com/?apikey=649e3e66&s=${searchTerm}`;

    if (this.cancel) {
      this.cancel.cancel();
    }

    this.cancel = axios.CancelToken.source();

    axios
      .get(searchUrl, { cancelToken: this.cancel.token })
      .then(response => {
        const resultNotFound = !response.data.Search.length
          ? "No Movies found"
          : "";
        this.setState({
          results: response.data.Search,

          loading: false
        });
        console.log(response.data);
      })
      .catch(error => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false
          });
        }
      });
  };

  handleInputChange = e => {
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm) {
      this.setState({
        searchTerm: searchTerm,
        results: {}
      });
    } else {
      this.setState(
        {
          searchTerm: searchTerm,
          loading: true
        },
        () => {
          this.fetchSearchResults(searchTerm);
        }
      );
    }
  };

  renderSearchResults = () => {
    const { results, loading, message } = this.state;
    const { getMovieByTitle } = this.props;

    if (Object.keys(results).length && results.length) {
      return (
        <ul id="searchList">
          {loading ? (
            <img src={loader} className="loader" alt="loader-gif" />
          ) : (
            results.map(foundMovie => {
              return (
                <li key={foundMovie.imdbID} className="foundMovie">
                  <span> {foundMovie.Title} </span>{" "}
                  <img
                    src={add}
                    alt="add"
                    onClick={() => getMovieByTitle(foundMovie.Title)}
                  />
                </li>
              );
            })
          )}
        </ul>
      );
    }
  };

  render() {
    const { searchTerm, loading } = this.state;

    return (
      <div id="input-div">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search movie"
          onChange={this.handleInputChange}
        />

        {/* Results */}
        {this.renderSearchResults()}
      </div>
    );
  }
}

export { Search };
