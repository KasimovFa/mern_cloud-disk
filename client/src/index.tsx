import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { setupReducer } from './store/store';


const store = setupReducer();


ReactDOM.render(
     <Provider store={store}>
       <App />
    </Provider>,
  document.getElementById('root')
);

