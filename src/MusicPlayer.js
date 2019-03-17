import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Imperfectly from './Sounds/Imperfectly.m4a';
import { Button } from 'react-bootstrap';
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
        <Button onClick={this.onClick}>{this.state.playing ? 'Stop' : 'Play Imperfectly'}</Button>
        <ReactPlayer url={Imperfectly} playing={this.state.playing} />
      </div>
    );
  }
}

export default MusicPlayer;
