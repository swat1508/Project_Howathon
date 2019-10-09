import React from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// import PWALoadable from './components/pwa-loadable'
import Login from './pages/login'
import Home from './pages/home'

// const Login = PWALoadable(() => import('./pages/login'))
// const Home = PWALoadable(() => import('./pages/home'))

class Router extends React.Component {

    render() {
        const {store} = this.props
        // return (
        //     <Provider store={store}>
        //         <BrowserRouter>
        //             <Route path='/' component={Login}>
        //                 <Route path="login" component={Login} />
        //                 <Route path="home" component={Home} />
        //             </Route>
        //         </BrowserRouter>
        //     </Provider>
        // )

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/">
                            <Login />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
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
