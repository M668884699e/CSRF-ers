import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import ChannelProvider from './context/ChannelContext';
import DMRProvider from './context/DMRContext';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import UserProvider from './context/UserContext';
import ChannelsUsersProvider from './context/ChannelsUsersContext';
import DMRUsersProvider from './context/DMRUsersContext';
import ProfileProvider from './context/ProfileContext';

const store = configureStore();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ModalProvider>
				<UserProvider>
					<ChannelProvider>
						<DMRProvider>
							<ChannelsUsersProvider>
								<DMRUsersProvider>
									<ProfileProvider>
										<App />
									</ProfileProvider>
								</DMRUsersProvider>
							</ChannelsUsersProvider>
						</DMRProvider>
					</ChannelProvider>
				</UserProvider>
			</ModalProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
