import React, { Component } from 'react';
import One from './images/One.png';
import Two from './images/Two.jpeg';
import Three from './images/Three.png';
import Four from './images/Four.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Alec Lorraine Music</h1>
          <h3>
            <span role="img" aria-label="Heart">❤️</span>
          </h3>
          <h2> Isley </h2>
        </header>
        <div className="pics">
          <img src={One} className="pic" alt="Isley" />
          <img src={Three} className="pic" alt="Isley" />
          <img src={Four} className="pic" alt="Isley" />
          <div id="pic-2-div">
            <img src={Two} className="pic pic-2" alt="Isley" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
