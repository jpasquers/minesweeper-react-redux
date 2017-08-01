import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { reduce } from './reducers/base';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(reduce);

ReactDOM.render(
    <Provider store={store}> 
        <App /> 
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
