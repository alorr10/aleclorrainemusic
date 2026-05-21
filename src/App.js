import React, { Component } from "react";
import "./App.css";
import MusicPlayer from "./MusicPlayer";
import { Container } from "react-bootstrap";

class App extends Component {
  render() {
    return (
      <Container fluid>
        <div className="p-5">
          <h1>Alec Lorraine Music</h1>
          <div className="ms-3">
            <MusicPlayer />
          </div>
        </div>
      </Container>
    );
  }
}

export default App;
