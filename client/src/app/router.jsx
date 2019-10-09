import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
// import PWALoadable from './components/pwa-loadable';
import Login from './pages/login';
import Home from './pages/home';

// const Login = PWALoadable(() => import('./pages/login'));
// const Home = PWALoadable(() => import('./pages/home'));

class Router extends React.Component {
    constructor() {
        super();

        this.state = {
            loggedIn: true
        };
    }

    render() {
        const {store} = this.props;

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login" render={() => (
                            this.state.loggedIn ? (
                                <Redirect to="/home"/>
                            ) : (
                                <Login />
                            )
                            )}/>
                        <Route exact path="/home" render={() => (
                            this.state.loggedIn ? (
                                <Home />
                            ) : (
                                <Redirect to="/login" />
                            )
                            )}/>
                        <Route exact path="/" render={() => (
                            this.state.loggedIn ? (
                                <Redirect to="/"/>
                            ) : (
                                <Login />
                            )
                            )}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        )
    }
}

Router.propTypes = {
    store: PropTypes.object
}

export default Router
