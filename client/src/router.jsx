import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'progressive-web-sdk/dist/routing';
import PWALoadable from './components/pwa-loadable';

// Containers
import App from '.'

const Login = PWALoadable(() => import('./pages/login'));
const Home = PWALoadable(() => import('./pages/home'));



class Router extends React.Component {

    render() {
        const {store} = this.props

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Route path='/' component={Login}>
                        <Route path="login" component={Login} />
                        <Route path="home" component={Home} />
                    </Route>
                </BrowserRouter>
            </Provider>
        )
    }
}

Router.propTypes = {
    store: PropTypes.object
}

export default Router
