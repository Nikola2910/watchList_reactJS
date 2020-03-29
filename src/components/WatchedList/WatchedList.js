import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";

import trash from "../../img/trash.png";
import "./WatchedList.scss";

class WatchedList extends Component {
  render() {
    const {
      watchedData,
      deleteWatchedMovie,
      showMovieDetails,
      hideSearchList
    } = this.props;
    return (
      <div
        id="watchedList"
        onClick={() => {
          hideSearchList();
        }}
      >
        <div className="main-wrapper">
          <div className="title-selector">
            <h1>Watched Movies</h1>
          </div>
          {watchedData.map(movie => {
            return (
              <div key={movie.id} className="watchedMovie">
                {/* left */}
                <div className="content">
                  <span className="rating">{movie.data.imdbRating}</span>

                  <div className="movieInfo">
                    <Link to={`/${movie.data.imdbID}`}>
                      <h2 onClick={() => showMovieDetails(movie.data.imdbID)}>
                        {" "}
                        {movie.data.Title}{" "}
                      </h2>
                    </Link>
                    <p>{movie.data.Genre}</p>
                  </div>
                </div>
                {/* right */}
                <div className="icons">
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
                    onClick={() => deleteWatchedMovie(movie.id)}
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

export { WatchedList };
