// import logo from "./logo.svg";
import "./App.css";
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
        <Terminal />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

export default App;
