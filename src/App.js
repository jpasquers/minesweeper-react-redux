import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {Game} from './components/Game';
import {Settings} from './components/Settings';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Minesweeper</h2>
        </div>
        <div className="container-fluid">
          <div>
            <Settings/>
          </div>
          <div className="game-container">
            <Game/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
