// Author: Prathmesh Srivastava (prathonit)
// 24-03-2021 , All rights reserved 

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import PublicRoute from './PublicRoute.js';
import PrivateRoute from './PrivateRoute.js';
import Index from './components/Index.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import AdminLogin from './components/AdminLogin';
import Home from './components/User/Home.js';

export default function App() {
	return (
		<Router>
				<Switch>
					<PublicRoute component = {Index} path = "/" exact />
					<PublicRoute component = {Login} path = '/login' exact />
					<PublicRoute component = {Register} path = '/register' exact />
					<PublicRoute component = {AdminLogin} path='/admin-login' exact />
					<PrivateRoute component = {Home} path = '/home' exact />
				</Switch>
		</Router>
	);
}

