import React from 'react';
import ReactDOM from 'react-dom';
import materializeCss from 'materialize-css/dist/css/materialize.min.css';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import App from './components/App';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={store}>
    <App/>
    </Provider>
    , document.querySelector('#root'));

console.log('STRIPE KEY is', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is', process.env.NODE_ENV);

