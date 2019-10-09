import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Router from "./app/router";
import configureStore from './app/store'

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("FromAPI", data => {
      // this.setState({ response: data });
      console.log("Socker API : ", data);
    });
  }

  render() {
    const store = configureStore()
    return <Router store={store} />
  }
}

export default App;
