import React from 'react';
import {Route,IndexRoute} from 'react-router';

import App from './app';
import SignupPage from './pages/signup';
import ChatLobby from './pages/main';
import LoginPage from './pages/login';
import Logout from './pages/logout';
import Chat from './pages/chat';


export default(
	<Route path="/" component={App} >
		<IndexRoute component={ChatLobby} />
		<Route path="signup" component={SignupPage}/>
		<Route path="login" component={LoginPage}/>
		<Route path="logout" component={Logout}/>
		<Route path="chat/:id" component={Chat}/>
	</Route>
)