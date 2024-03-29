// Author: Prathmesh Srivastava (prathonit)
// 24-03-2021 , All rights reserved 

import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ScrollToTop from './components/basic/ScrollToTop.js';
import PublicRoute from './PublicRoute.js';
import PrivateRoute from './PrivateRoute.js';
import Header from './components/basic/Header.js';
import Footer from './components/basic/Footer.js';
import Index from './components/Index.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import AdminLogin from './components/AdminLogin';
import Home from './components/User/Home.js';
import Profile from './components/User/Profile';
import ChangePassword from './components/User/ChangePassword';
import Search from './components/User/Search.js';
import Book from './components/User/Book.js';
import Order from './components/User/Order.js';
import Magic from './components/User/Magic.js';
import LeaderBoard from './components/User/LeaderBoard';
import AdminBook from './components/Admin/Book.js';
import AdminOrder from './components/Admin/Order.js';
import AdminUser from './components/Admin/User.js';
import AdminAddBook from './components/Admin/AddBook.js';
import AdminCheckout from './components/Admin/Checkout.js';
import AdminReturn from './components/Admin/Return.js';
import AdminReport from './components/Admin/Report.js';

export default function App() {
	return (
		<Router>
			<ScrollToTop />
			<Header />
			<div className = 'wrapper'>
				<Switch>
					<PublicRoute component = {Index} path = "/" exact />
					<PublicRoute component = {Login} path = '/login' exact />
					<PublicRoute component = {Register} path = '/register' exact />
					<PublicRoute component = {AdminLogin} path='/admin-login' exact />
					<PrivateRoute component = {Home} path = '/home' exact />
					<PrivateRoute component = {Profile} path = '/user/profile' exact />
					<PrivateRoute component = {ChangePassword} path = '/user/change-password' exact />
					<PrivateRoute component = {Search} path = '/search' exact />
					<PrivateRoute component = {Book} path = '/book/:b_id' />
					<PrivateRoute component = {Order} path = '/orders' exact />
					<PrivateRoute component = {Order} path = '/orders' exact />
					<PrivateRoute component = {Magic} path = '/magic' exact />
					<PrivateRoute component = {LeaderBoard} path = '/leaderboard' exact />
					<PrivateRoute component = {AdminBook} path = '/admin/books' exact />
					<PrivateRoute component = {AdminOrder} path = '/admin/orders' exact />
					<PrivateRoute component = {AdminUser} path = '/admin/users' exact />
					<PrivateRoute component = {AdminAddBook} path = '/admin/add-book' exact />
					<PrivateRoute component = {AdminCheckout} path = '/admin/checkout' exact />
					<PrivateRoute component = {AdminReturn} path = '/admin/return' exact />
					<PrivateRoute component = {AdminReport} path = '/admin/reports' exact />
				</Switch>
			</div>
			<Footer />
		</Router>
	);
}

