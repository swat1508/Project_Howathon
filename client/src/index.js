import React from 'react';
import ReactDOM from 'react-dom';
import './app/index.scss';
import Router from './app/router.jsx';
import * as serviceWorker from './app/serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import configureStore from './app/store'
const store = configureStore()

ReactDOM.render(<Router store={store}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
