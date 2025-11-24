import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import "./Navbar.css";

function NavigationBar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <div className="sidebar">
        <Nav className="nav-links">
          <Nav.Link href="#about">About Me</Nav.Link>
          <Nav.Link href="#projects">Projects</Nav.Link>
          <Nav.Link href="#contact">Contact</Nav.Link>
          <Nav.Link
            className="nav-resume"
            href="https://overleaf-viewer.vercel.app/view/wdfgcctzrvtq"
          >
            Resume
          </Nav.Link>
        </Nav>
      </div>

      {/* MOBILE HAMBURGER */}
      <div
        className={`mobile-menu-top ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* MOBILE POPUP */}
      <div className={`mobile-popup ${open ? "show" : ""}`}>
        <a href="#about" onClick={() => setOpen(false)}>
          About Me
        </a>
        <a href="#projects" onClick={() => setOpen(false)}>
          Projects
        </a>
        <a href="#contact" onClick={() => setOpen(false)}>
          Contact
        </a>
        <a
          className="nav-resume"
          href="https://overleaf-viewer.vercel.app/view/wdfgcctzrvtq"
          onClick={() => setOpen(false)}
        >
          Resume
        </a>
      </div>
    </>
  );
}

export default NavigationBar;
