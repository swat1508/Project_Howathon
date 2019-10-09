import React, { Component } from "react";
import "./login.scss";

import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import socketIOClient from "socket.io-client";
import firebase from "firebase";

import {updateUserDetails} from './actions'
import { firebaseConfig as config } from "./../../../config";
import axios from "axios";
import { serverUrl } from "../../../constant/constant";

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

  login = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(googleResponse => {
        axios.post(`${serverUrl}/login`, {email: googleResponse.user.email, name: googleResponse.user.displayName}).then(res => {
          let returnedUser = googleResponse.user
          this.props.dispatchUserDetails(
            {
              email: returnedUser.email,
              displayName: returnedUser.displayName,
              id: res.data.id
            }
          );
        this.props.history.push("/home");
        })
      });
  }

  render() {
    return (
      <div className="Login">
        {/* <header className="Login-header">
          <div className="login-hero-img"></div>
          <div className="google-login-button">
               
            <button
              className="loginBtn loginBtn--google"
              onClick={this.login.bind(this)}
            >
              Login with Google
            </button>
                      
          </div>
        </header> */}

        <div className="left-side">
          <div className="overlay"></div>
        </div>
        <div className="right-side">
          <div className="login-wrapper">
            <h2 className="login-text">Account Login</h2>
            <button className="login-btn" onClick={this.login}>
              <FontAwesomeIcon className="login-icon" icon={faSignInAlt} />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatchUserDetails: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserDetails: (user) =>
      dispatch(updateUserDetails(user))
})

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Login))
