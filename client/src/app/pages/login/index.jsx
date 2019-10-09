import React, { Component } from "react";
import "./login.scss";

import socketIOClient from "socket.io-client";
import { withRouter } from "react-router-dom";
import firebase from "firebase";
import { firebaseConfig as config } from "./../../../config";

const firebaseApp = firebase.initializeApp(config);
class Login extends Component {
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

  login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(user => {
        // console.log("result aa gya =>", user);
        // this.props.dispatchUserDetails(user)
        this.props.history.push("/home");
      });
  }

  render() {
    return (
      <div className="Login">
        <header className="Login-header">
          <div className="login-hero-img"></div>
          <div className="google-login-button">
               
            <button
              className="loginBtn loginBtn--google"
              onClick={this.login.bind(this)}
            >
              Login with Google
            </button>
                      
          </div>
        </header>
      </div>
    );
  }
}

export default withRouter(Login);
