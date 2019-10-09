import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

import socketIOClient from "socket.io-client";
import { Button, ButtonToolbar } from 'react-bootstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: 'http://127.0.0.1:4001'
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => {
      // this.setState({ response: data });
      console.log('Socker API : ', data);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
  
          <ButtonToolbar>
            <Button variant="outline-primary">Primary</Button>
            <Button variant="outline-secondary">Secondary</Button>
            <Button variant="outline-success">Success</Button>
            <Button variant="outline-warning">Warning</Button>
            <Button variant="outline-danger">Danger</Button>
            <Button variant="outline-info">Info</Button>
            <Button variant="outline-light">Light</Button>
            <Button variant="outline-dark">Dark</Button>
          </ButtonToolbar>
        </header>
      </div>
    );
  }
}

export default App;
