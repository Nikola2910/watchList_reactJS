import React, { Component } from "react";
import "./MovieDetails.scss";

class MovieDetails extends Component {
  render() {
    const { movieDetails } = this.props;
    return (
      <div className="main-wrapper">
        <div id="movie-details">
          <div className="poster">
            <img src={movieDetails.Poster} alt="movie-poster" />
          </div>
          <div className="details">
            <span className="rating-big">{movieDetails.imdbRating}</span>
            <h1>
              Title: &nbsp; <span>{movieDetails.Title}</span>{" "}
            </h1>
            <h3>
              Runtime: &nbsp;<span>{movieDetails.Runtime}</span>
            </h3>
            <h3 className="actors">
              Genre:&nbsp;
              <div>
                <span>{movieDetails.Genre}</span>
              </div>
            </h3>
            <h3>
              Director:&nbsp; <span>{movieDetails.Director}</span>
            </h3>
            <h3 className="actors">
              Actors:&nbsp;&nbsp;
              <div>
                <span>{movieDetails.Actors}</span>
              </div>
            </h3>
            <h3>
              Plot:
              <div className="plot">
                <span>{movieDetails.Plot}</span>
              </div>
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export { MovieDetails };
