import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
             <header className="App-header">
                
                <h1 className="App-title">Welcome to ChatApp by EUNOIA </h1>
            </header>
 
<div className="googleAuthFormCss">
      Please Sign in below

      <div className="google-login-button">
          <a href="https://backend-xt-fsd.herokuapp.com/users/auth/google" class="button">
            <button class="loginBtn loginBtn--google">Login with Google</button>
            </a>
        </div>


      </div>
      </div>
    );
  }
}

export default App;
