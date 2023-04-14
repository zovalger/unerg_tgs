import { useState } from "react";
import { Navbar, NavbarToggler, NavbarBrand, Button } from "reactstrap";

export default function NavBar({ left, title, right }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar>
				{left}
				<NavbarBrand
				// href="/"
				>
					{title}
				</NavbarBrand>

				{/* {children} */}

				{right}

				{/* <NavbarToggler onClick={toggle} /> */}
			</Navbar>
		</div>
	);
}
