import React, { Component } from "react";
import "./login.scss";

import socketIOClient from "socket.io-client";
import { Button, ButtonToolbar } from "react-bootstrap";

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
    console.log("-------------- Logging IN")
  }

  render() {
    return (
      <div className="Login">
        <header className="Login-header">
          <div className="login-hero-img"></div>
          <div className="google-login-button">
            <a
              href="https://backend-xt-fsd.herokuapp.com/users/auth/google"
              className="button"
            >    
              <button className="loginBtn loginBtn--google" href="/home">
                Login with Google
              </button>     
            </a>
                    
          </div>
        </header>
      </div>
    );
  }
}

export default Login;
