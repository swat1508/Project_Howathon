import React from "react";
import "./App.scss";

import { Button, ButtonToolbar } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="login-hero-img"></div>

        {/* <ButtonToolbar>
          <Button variant="outline-success">Sign-in with Google</Button>
        </ButtonToolbar> */}
        <div className="google-login-button">
                    
          <a
            href="https://backend-xt-fsd.herokuapp.com/users/auth/google"
            class="button"
          >
                        
            <button class="loginBtn loginBtn--google">Login with Google</button>
                        
          </a>
                  
        </div>
      </header>
    </div>
  );
}

export default App;
