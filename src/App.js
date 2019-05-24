import React, { Component } from 'react';
import './App.css';
import MusicPlayer from './MusicPlayer';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
class App extends Component {
  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h1>Alec Lorraine Music</h1>
          <div className="ml-3">
            <MusicPlayer />
          </div>
        </Jumbotron>
      </Container>
    );
  }
}

export default App;
