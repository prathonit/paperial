import React, { useState } from 'react';
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
	IoLockClosedOutline
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
							<NavLink href="/login/"> <IoBookOutline /> Books</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/register/"> <IoSearch /> Search </NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/admin-login/"> <IoBagOutline /> Orders</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/admin-login/"> <IoColorWandOutline /> Magic suggestions</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/admin-login/"> <IoTrophyOutline /> Leaderboard</NavLink>
						</NavItem>
					</Nav>
					<Nav className="mr-right" navbar>
						<UncontrolledDropdown nav inNavbar>
							<DropdownToggle nav caret>
								Options
							</DropdownToggle>
							<DropdownMenu right>
								<DropdownItem>
									<IoPersonSharp /> Profile
								</DropdownItem>
								<DropdownItem divider />
								<DropdownItem>
									<IoLockClosedOutline /> Change password
								</DropdownItem>
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
	Header = HeaderLoggedOut;
}


export default Header;
