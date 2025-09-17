import React from "react";
import { Nav } from "react-bootstrap";
import "./Navbar.css";

function NavigationBar() {
  return (
    <div className="sidebar">
      <Nav className="flex-column nav-links">
      <Nav.Link href="#hero" className="vertical-text">           </Nav.Link>
        <Nav.Link href="#about" className="vertical-text">About Me</Nav.Link>
        <Nav.Link href="#projects" className="vertical-text">Projects</Nav.Link>
        <Nav.Link href="#contact" className="vertical-text">Contact</Nav.Link>

      </Nav>
    </div>
  );
}

export default NavigationBar;
