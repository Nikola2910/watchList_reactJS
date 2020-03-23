import React, { Component } from "react";
import watched from "../../img/visibility.png";
import trash from "../../img/trash.png";
import "./ToWatchList.scss";

class ToWatchList extends Component {
  render() {
    const { toWatchData, deleteMovie } = this.props;
    return (
      <div id="toWatchList">
        <div className="main-wrapper">
          <h1>To Watch</h1>

          {toWatchData.map(movie => {
            return (
              <div key={movie.id} className="toWatchMovie">
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
                  <img src={watched} alt="" />
                  <img
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
