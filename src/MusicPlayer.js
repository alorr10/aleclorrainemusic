import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Imperfectly from './Sounds/Imperfectly.m4a';
class MusicPlayer extends Component {
  state = {
    playing: false,
  };

  onClick = () => {
    this.setState(prevState => {
      return { playing: !prevState.playing };
    });
  };
  render() {
    return (
      <div>
        <button onClick={this.onClick}>{this.state.playing ? 'Stop' : 'Play'}</button>
        <ReactPlayer url={Imperfectly} playing={this.state.playing} />
      </div>
    );
  }
}

export default MusicPlayer;
