import React, { Component } from "react";
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
            console.log(this.state.toWatchData);
          }
        );
      }
    );
  };

  render() {
    return (
      <select onChange={this.handleFilter} value={this.state.value}>
        <option value="Drama">Drama</option>
        <option value="Horror">Horror</option>
        <option value="Sci-fi">Sci-fi</option>
      </select>
    );
  }
}

export { Filter };
