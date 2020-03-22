import React, { Component, Fragment } from "react";
import axios from "axios";

import "./reset.scss";
import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";

import { Search } from "./components/Search/Search";

class App extends Component {
  state = {};

  render() {
    return (
      <header>
        <div className="main-wrapper">
          <div id="header">
            <h3 id="logo">Movie Watchlist</h3>
            <Search />
          </div>
        </div>
      </header>
    );
  }
}

export default App;
