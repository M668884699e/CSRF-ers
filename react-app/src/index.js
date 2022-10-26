import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import ChannelProvider from './context/ChannelContext';
import App from './App';
import configureStore from './store';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChannelProvider>
        <App />
      </ChannelProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
