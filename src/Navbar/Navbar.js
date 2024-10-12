import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Navbar.css";

function NavigationBar() {
  return (
    <Navbar bg="light" expand="lg">
      {/* <Navbar.Brand href="#home">BrandName</Navbar.Brand> */}
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#projects">Projects</Nav.Link>
          {/* <Nav.Link href="#about">About</Nav.Link> */}
          {/* <Nav.Link href="#services">Services</Nav.Link> */}
          <Nav.Link href="#contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
