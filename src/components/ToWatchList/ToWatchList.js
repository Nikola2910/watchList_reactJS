import React, { Component } from "react";
import { Link } from "react-router-dom";

import ReactTooltip from "react-tooltip";

import watched from "../../img/hidden.png";
import trash from "../../img/trash.png";

import "./ToWatchList.scss";

class ToWatchList extends Component {
  render() {
    const {
      toWatchData,
      deleteMovie,
      moveToWatched,
      showMovieDetails,
      hideSearchList
    } = this.props;

    return (
      <div
        id="toWatchList"
        onClick={() => {
          hideSearchList();
        }}
      >
        <div className="main-wrapper">
          <div className="title-selector">
            <h1>To Watch</h1>
          </div>
          {toWatchData.map(movie => {
            return (
              <div key={movie.id} className="toWatchMovie">
                {/* left */}
                <div className="content">
                  <span className="rating">{movie.data.imdbRating}</span>

                  <div className="movieInfo">
                    <Link to={`/${movie.data.imdbID}`}>
                      <h2 onClick={() => showMovieDetails(movie.data.imdbID)}>
                        {movie.data.Title}{" "}
                      </h2>
                    </Link>
                    <p>{movie.data.Genre}</p>
                  </div>
                </div>
                {/* right */}
                <div className="icons">
                  <ReactTooltip
                    id="watched"
                    place="top"
                    effect="solid"
                    type="info"
                    backgroundColor="rgb(0, 174, 255);"
                  >
                    <span> Watched Movie </span>
                  </ReactTooltip>
                  <img
                    data-tip
                    data-for="watched"
                    src={watched}
                    alt=""
                    onClick={() => moveToWatched(movie)}
                  />
                  <ReactTooltip
                    id="delete"
                    place="top"
                    effect="solid"
                    type="error"
                  >
                    <span> Delete Movie </span>
                  </ReactTooltip>
                  <img
                    data-tip
                    data-for="delete"
                    src={trash}
                    alt=""
                    onClick={() => deleteMovie(movie.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export { ToWatchList };
