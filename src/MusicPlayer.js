import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import Imperfectly from './Sounds/Imperfectly.m4a';
import GayForTheWeekend from './Sounds/GayForTheWeekend.mp3';
import MelatoninDreams from './Sounds/MelatoninDreams.mp3';
import { Row, Col, Button } from 'react-bootstrap';
class MusicPlayer extends Component {
  state = {
    playing: false,
    activeSong: Imperfectly,
    activeSongName: 'Imperfectly',
  };

  onClick = title => {
    if (this.state.playing) return this.setState({ playing: false });
    switch (title) {
      case 'Imperfectly':
        this.setState(prevState => ({
          playing: !prevState.playing,
          activeSong: Imperfectly,
          activeSongName: 'Imperfectly',
        }));
        break;
      case 'GayForTheWeekend':
        this.setState(prevState => ({
          playing: !prevState.playing,
          activeSong: GayForTheWeekend,
          activeSongName: 'GayForTheWeekend',
        }));
        break;
      case 'MelatoninDreams':
        this.setState(prevState => ({
          playing: !prevState.playing,
          activeSong: MelatoninDreams,
          activeSongName: 'MelatoninDreams',
        }));
        break;
    }
  };

  render() {
    const { playing, activeSong, activeSongName } = this.state;
    return (
      <div>
        <Row className="mb-3">
          <Button onClick={() => this.onClick('Imperfectly')}>
            {playing && activeSongName === 'Imperfectly' ? 'Stop' : 'Play Imperfectly'}
          </Button>
        </Row>
        <Row className="mb-3">
          <Button onClick={() => this.onClick('GayForTheWeekend')}>
            {playing && activeSongName === 'GayForTheWeekend' ? 'Stop' : 'Play Gay For The Weekend'}
          </Button>
        </Row>
        <Row>
          <Button onClick={() => this.onClick('MelatoninDreams')}>
            {playing && activeSongName === 'MelatoninDreams' ? 'Stop' : 'Play Melatonin Dreams'}
          </Button>
        </Row>
        <ReactPlayer url={activeSong} playing={this.state.playing} />
      </div>
    );
  }
}

export default MusicPlayer;
