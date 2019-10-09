import React, { Component } from "react";
import { serverUrl } from './constant/constant';
import "./App.scss";
import socketIOClient from "socket.io-client";
import Router from "./app/router";
import configureStore from './app/store'

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: serverUrl
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
