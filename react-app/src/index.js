import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import ChannelProvider from './context/ChannelContext';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import UserProvider from './context/UserContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <UserProvider>
          <ChannelProvider>
            <App />
          </ChannelProvider>
        </UserProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
