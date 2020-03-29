import React, { Component, Fragment } from "react";
import "./Filter.scss";

class Filter extends Component {
  state = {
    filter: ""
  };

  handleFilter = e => {
    this.setState(
      {
        filter: e.target.value
      },
      () => {
        const { toWatchData, fetchData } = this.props;

        const filteredToWatchData = toWatchData.filter(movie => {
          return movie.data.Genre.toLowerCase().includes(
            this.state.filter.toLowerCase()
          );
        });
        this.setState(
          {
            toWatchData: filteredToWatchData
          },
          // fetchData()
          () => {
            this.props.onFilter(this.state.toWatchData);
          }
        );
      }
    );
  };

  render() {
    const { hideSearchList } = this.props;
    return (
      <Fragment>
        <div className="main-wrapper">
          <div
            className="filter"
            onClick={() => {
              hideSearchList();
            }}
          >
            <select onChange={this.handleFilter} value={this.state.value}>
              <option value="">Select Genre</option>
              <option value="Drama">Drama</option>
              <option value="Horror">Horror</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Crime">Crime</option>
              <option value="Comedy">Comedy</option>
              <option value="Action">Action</option>
              <option value="Thriller">Thriller</option>
              <option value="Adventure">Adventure</option>
              <option value="Biography">Biography</option>
            </select>

            <button onClick={this.props.resetFilter}>Reset Filter</button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export { Filter };
