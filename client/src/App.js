import React, { Component } from "react";
import { firebaseConfig } from "./config";
import firebase from "firebase";
import "./App.scss";

import socketIOClient from "socket.io-client";

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
        <header className="App-header">
          <div class="login-hero-img"></div>

          <div className="google-login-button">
                      
            <a
              href="https://backend-xt-fsd.herokuapp.com/users/auth/google"
              class="button"
            >
                         
              <button class="loginBtn loginBtn--google">
                Login with Google
              </button>
                          
            </a>
                    
          </div>
        </header>
      </div>
    );
  }
}

export default App;
