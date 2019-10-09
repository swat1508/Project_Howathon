import React, { Component } from "react";
import { firebaseConfig } from "./config";
import firebase from "firebase";
import { Provider } from "react-redux";
import "./App.scss";
import store from "./store/store";
import socketIOClient from "socket.io-client";

import { Button, ButtonToolbar } from "react-bootstrap";
import Home from "./components/Home/Home";

const firebaseApp = firebase.initializeApp(firebaseConfig);

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
    return (
      <div className="App">
          <Provider store={store}>
            <Home />
          </Provider>
      </div>
    );
  }
}

export default App;
