import { useState } from "react";
import { Navbar, NavbarToggler, NavbarBrand, Button } from "reactstrap";

import styles from "../../styles/Nav/NavStyle.module.css";

export default function NavBar({ left, title, right, ViPrincipal, Fixed }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {Fixed ? (
        <Navbar fixed="top">
          {left}
          <NavbarBrand 
            className={ViPrincipal ? styles.title_NavPrincipal : ""}

            // href="/"
          >
            {title}
          </NavbarBrand>

          {/* {children} */}

          {right}

          {/* <NavbarToggler onClick={toggle} /> */}
        </Navbar>
      ) : (
        <Navbar>
          {left}
          <NavbarBrand
            className={ViPrincipal ? styles.title_NavPrincipal : ""}

            // href="/"
          >
            {title}
          </NavbarBrand>

          {/* {children} */}

          {right}

          {/* <NavbarToggler onClick={toggle} /> */}
        </Navbar>
      )}
    </div>
  );
}
