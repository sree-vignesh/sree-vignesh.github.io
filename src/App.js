// import logo from "./logo.svg";
import "./App.css";
import "./tailwind.css";

import Hero from "./Hero/Hero";
import Terminal from "./Terminal/Terminal";
import Projects from "./Projects/Projects";
import Contact from "./Contact/Contact";
import BackgroundGradient from "./BackgroundGradient/BackgroundGradient";
// import { Navbar, Nav } from "react-bootstrap";
import NavigationBar from "./Navbar/Navbar";

function App() {
  return (
    <div className="app-container">
      <NavigationBar />
      <div className="background">
        <BackgroundGradient />
        <Hero />
        <section id="about">
          <Terminal />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
        {/* 
        <Terminal id="about" />
        <Projects id="projects" />
        <Contact id="contact" /> */}
      </div>
    </div>
  );
}

export default App;
