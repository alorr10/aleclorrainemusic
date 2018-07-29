import React, { Component } from 'react';
import One from './images/One.png';
import Two from './images/Two.jpeg';
import Three from './images/Three.png';
import Four from './images/Four.png';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import './App.css';
import MusicPlayer from './MusicPlayer';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Alec Lorraine Music</h1>
          <h3>
            <span role="img" aria-label="Heart">
              ❤️
            </span>
          </h3>
          <h2> Isley </h2>
        </header>
        <div className="carousel">
          <Carousel>
            <div>
              <img src={One} />
              <p className="legend">Isley and the commander</p>
            </div>
            <div>
              <img src={Two} />
              <p className="legend">Rawlings. Is it in you?</p>
            </div>
            <div>
              <img src={Three} />
              <p className="legend">I dont know she exists</p>
            </div>
            <div>
              <img src={Four} />
              <p className="legend">Artsy</p>
            </div>
          </Carousel>
          <MusicPlayer />
        </div>
      </div>
    );
  }
}

export default App;
