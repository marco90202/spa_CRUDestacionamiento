import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import bootstrap from 'bootstrap'; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/argon.min.css"; // ok traido de la plantilla original
import "./assets/css/font-awesome.min.css"; // ok traido del rubik2019
import "./assets/css/main.css"; // traido de la plantilla original

import './index.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
