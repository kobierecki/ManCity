import React from 'react';
import ReactDOM from 'react-dom';
import './resources/css/app.css';

import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';
import { firebase } from './firebase';

const App = (props) => {
    return (
        <BrowserRouter>
            <Routes {...props} />
        </BrowserRouter>
    )
};

firebase.auth().onAuthStateChanged((user) => {
    ReactDOM.render(<App user={user} />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
