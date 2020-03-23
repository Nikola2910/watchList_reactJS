import React, { Component } from "react";

import trash from "../../img/trash.png";
import "./WatchedList.scss";

class WatchedList extends Component {
  render() {
    const { watchedData, deleteWatchedMovie } = this.props;
    return (
      <div id="watchedList">
        <div className="main-wrapper">
          <h1>Watched Movies</h1>

          {watchedData.map(movie => {
            return (
              <div key={movie.id} className="watchedMovie">
                {/* left */}
                <div className="content">
                  <span className="rating">{movie.data.imdbRating}</span>

                  <div className="movieInfo">
                    <h2> {movie.data.Title} </h2>
                    <p>{movie.data.Genre}</p>
                  </div>
                </div>
                {/* right */}
                <div className="icons">
                  <img
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
