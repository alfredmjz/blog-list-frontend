import React from "react";
import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer";

const Header = ({ users }) => {
	const dispatch = useDispatch();
	const userTitle = `Signed in as: ${users.loginUser.name}`;
	return (
		<Navbar variant="dark" bg="dark">
			<Container fluid>
				<Navbar.Brand>
					<Link to="/" style={{ all: "inherit", cursor: "pointer" }}>
						Blog Application
					</Link>
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="navbarScroll" />
				<Navbar.Collapse id="navbarScroll">
					<Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
						<Link
							to={{
								pathname: "/users",
								state: users,
							}}
							style={{ color: "white", textDecoration: "none", cursor: "pointer" }}
						>
							Users
						</Link>
					</Nav>

					<NavDropdown title={userTitle} id="navbarScrollingDropdown" style={{ color: "white" }}>
						<NavDropdown.Item
							onClick={() => {
								window.localStorage.clear();
								dispatch(logoutUser());
							}}
						>
							Sign out
						</NavDropdown.Item>
					</NavDropdown>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
