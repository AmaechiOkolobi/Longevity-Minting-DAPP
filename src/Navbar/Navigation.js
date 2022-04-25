import { React, useState, useEffect } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

import "./nav.css";

function Navigation() {
	const [show, setShow] = useState(true);
	const [tempScroll, setTempScroll] = useState(0);
	// method for creating nav bar fade in and out
	const controlNavbar = () => {
		setTempScroll(window.scrollY);

		if (tempScroll < window.scrollY) {
			setShow(false);
		} else {
			setShow(true);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", controlNavbar);
		return () => {
			window.removeEventListener("scroll", controlNavbar);
		};
	}, [tempScroll]);

	return (
		<>
			<Navbar
				expand="lg"
				fixed="top"
				collapseOnSelect
				style={{
					visibility: show ? "visible" : "hidden",
				}}
				className={`nav-dissapear ${show && "nav-col"}`}
			>
				<Container fluid>
					<Nav className="m-auto">
						<Navbar.Brand href="/">Longevity</Navbar.Brand>
					</Nav>
				</Container>
			</Navbar>
		</>
	);
}

export default Navigation;
