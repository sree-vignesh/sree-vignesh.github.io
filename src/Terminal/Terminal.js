import React, { useState, useEffect, useRef } from "react";
// import Rough from "roughjs/bundler"; // Import Rough.js
// import { RoughCanvas } from "roughjs/bin/canvas";
import "./Terminal.css"; // Ensure you have appropriate styles
import {
  whois,
  about,
  social,
  projects,
  help as commandHelp,
  email,
} from "./terminalData";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [commands, setCommands] = useState([]);
  const [commandIndex, setCommandIndex] = useState(-1);
  const textareaRef = useRef(null);

  const password = "your_password"; // Define your password
  const [isPasswordMode, setIsPasswordMode] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const roughCanvasRef = useRef(null); // Reference for Rough.js canvas

  const welcomeMessage = [
    "Welcome to the terminal!<br/> Type 'help' for a list of commands.<br/>",
    "List of commands: help, about, projects, email, clear, history",
  ];
  // Example theme state
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    // Print whois information on load
    loopLines(welcomeMessage, 80);
  }, []); // Empty dependency array to run on mount
  const loopLines = (lines, time) => {
    lines.forEach((line, index) => {
      setTimeout(() => addLine(line), index * time);
    });
  };

  const addLine = (text) => {
    setOutput((prevOutput) => [...prevOutput, text]);
    window.scrollTo(0, document.body.scrollHeight);
  };

  const handleKeyUp = (e) => {
    if (isPasswordMode) {
      if (e.key === "Enter") {
        if (input === password) {
          setIsPasswordCorrect(true);
          addLine("Password accepted.");
          setInput("");
          setIsPasswordMode(false);
        } else {
          addLine("Wrong password");
          setInput("");
        }
      }
    } else {
      if (e.key === "Enter") {
        const command = input.trim().toLowerCase();
        if (command) {
          setCommands((prev) => [...prev, command]);
          setCommandIndex(-1);
          addLine(`<span class="command">> ${command}</span>`);
          processCommand(command);
        }
        setInput("");
      } else if (e.key === "ArrowUp") {
        if (commandIndex > 0) {
          setCommandIndex((prev) => prev - 1);
          setInput(commands[commandIndex - 1]);
        }
      } else if (e.key === "ArrowDown") {
        if (commandIndex < commands.length - 1) {
          setCommandIndex((prev) => prev + 1);
          setInput(commands[commandIndex + 1] || "");
        }
      }
    }
  };

  const processCommand = (cmd) => {
    switch (cmd) {
      case "help":
        loopLines(commandHelp, 80);
        break;
      case "hi":
        loopLines(welcomeMessage, 80);
        break;
      case "about":
        loopLines(whois, 80);
        break;
      case "social":
        loopLines(social, 80);
        break;
      case "secret":
        setIsPasswordMode(true);
        break;
      case "projects":
        loopLines(projects, 80);
        break;
      case "email":
        addLine(
          'Opening mailto:<a href="mailto:reach.sreevignesh@gmail.com">reach.sreevignesh@gmail.com</a>...'
        );
        break;
      case "clear":
        setOutput([]); // Clear the terminal output
        break;
      case "history":
        loopLines(
          commands.map((cmd) => `<span class="command">> ${cmd}</span>`),
          80
        );
        break;
      default:
        addLine("Command not found. Type 'help' for a list of commands.");
        break;
    }
  };

  return (
    <section className={`Terminal ${theme} d-flex flex-column`}>
      <div className="app-bar">
        <div className="app-bar-button minimize"></div>
        <div className="app-bar-button maximize"></div>
        <div className="app-bar-button close"></div>
      </div>
      <div className="terminal terminal-border">
        <div className="terminal-output">
          {output.map((line, index) => (
            <p
              key={index}
              className="terminal-line"
              dangerouslySetInnerHTML={{ __html: line }}
            />
          ))}
        </div>
        <div className="terminal-input">
          <span>&gt;</span>
          <input
            color="white"
            type="text"
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </div>
      </div>
    </section>
  );
};

export default Terminal;
