import { useState } from "react";
import { Navbar, NavbarToggler, NavbarBrand, Button } from "reactstrap";

export default function NavBar({ title, children }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar>
				{/* <Button >...</Button> */}
				<NavbarBrand
				// href="/"
				>
					{title}
				</NavbarBrand>

				{children}
				{/* <NavbarToggler onClick={toggle} /> */}
			</Navbar>
		</div>
	);
}
