import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownMenu,
	DropdownToggle,
	DropdownItem
} from 'reactstrap';
import {
	IoLogOutOutline,
	IoPersonSharp,
	IoSearch,
	IoBookOutline,
	IoBagOutline,
	IoColorWandOutline,
	IoTrophyOutline,
	IoLockClosedOutline,
	IoBagCheckOutline,
	IoReturnDownBackOutline,
	IoAddCircleOutline,
	IoInformationCircleOutline
} from 'react-icons/io5';
import { isLoggedIn } from '../../agent';

const HeaderLoggedOut = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/">Paperial</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink href="/login/">Login</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/register/">Register</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/admin-login/">Admin Login</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

const HeaderUserLoggedIn = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	let logout = () => {
		localStorage.clear('accessToken');
		window.location = '/';
	};

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/">Paperial</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink href="/home/"> <IoBookOutline /> Books</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/search/"> <IoSearch /> Search </NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/orders/"> <IoBagOutline /> Orders</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/magic/"> <IoColorWandOutline /> Magic suggestions</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/leaderboard/"> <IoTrophyOutline /> Leaderboard</NavLink>
						</NavItem>
					</Nav>
					<Nav className="mr-right" navbar>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Options
							</DropdownToggle>
							<DropdownMenu right>
								<Link to = '/user/profile'>
									<DropdownItem>
										<IoPersonSharp /> Profile
									</DropdownItem>
								</Link>
								<DropdownItem divider />
								<Link to = '/user/change-password'>
									<DropdownItem>
										<IoLockClosedOutline /> Change password
									</DropdownItem>
								</Link>
								<DropdownItem divider />
								<DropdownItem onClick = {logout}>
									Logout <IoLogOutOutline />
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

const HeaderAdminLoggedIn = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	let logout = () => {
		localStorage.clear('accessToken');
		window.location = '/';
	};

	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavbarBrand href="/admin/books">Paperial Admin</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink href="/admin/books"> <IoBookOutline /> Books</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/admin/orders"> <IoBagOutline /> Orders</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/admin/users"> <IoPersonSharp /> Users</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/admin/add-book"> <IoAddCircleOutline /> Add Book</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/admin/checkout"> <IoBagCheckOutline /> Checkout</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/admin/return"> <IoReturnDownBackOutline /> Return</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/admin/reports"> <IoInformationCircleOutline /> Generate report</NavLink>
						</NavItem>
					</Nav>
					<Nav className="mr-right" navbar>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Options
							</DropdownToggle>
							<DropdownMenu right>
								<Link to = '/admin/profile'>
									<DropdownItem>
										<IoPersonSharp /> Profile
									</DropdownItem>
								</Link>
								<DropdownItem divider />
								<DropdownItem onClick = {logout}>
									Logout <IoLogOutOutline />
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

let roleLoggedIn = isLoggedIn();
let Header = HeaderLoggedOut;

if (roleLoggedIn === 'user') {
	Header = HeaderUserLoggedIn;
} else if (roleLoggedIn === 'admin') {
	Header = HeaderAdminLoggedIn;
}


export default Header;
