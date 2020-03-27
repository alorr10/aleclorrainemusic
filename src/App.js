import React, { Component } from 'react';
import './App.css';
import MusicPlayer from './MusicPlayer';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';
import { withCookies, Cookies } from 'react-cookie';

class App extends Component {
  componentDidMount() {
    console.log('here;', this.props);
  }
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

export default withCookies(App);
