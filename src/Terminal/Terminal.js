import React, { useState, useEffect, useRef } from "react";
import "./Terminal.css";

const Terminal = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [commands, setCommands] = useState([]);
  const [commandIndex, setCommandIndex] = useState(-1);

  const [terminalData, setTerminalData] = useState(null);

  const textareaRef = useRef(null);

  // ----------------------------------------------------------------------
  // LOAD terminalData.json
  // ----------------------------------------------------------------------
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/sree-vignesh/data-for-portfolio/refs/heads/main/terminal/terminalData.json"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Loaded terminal data:", data);
        setTerminalData(data);
        loopLines(data.whois, 120);
      })
      .catch((err) => console.error("Terminal JSON load error:", err));
  }, []);

  // ----------------------------------------------------------------------
  // UTILITY FUNCTIONS
  // ----------------------------------------------------------------------
  const loopLines = (lines, time) => {
    lines.forEach((line, i) => {
      setTimeout(() => addLine(line), i * time);
    });
  };

  const addLine = (text) => {
    setOutput((prev) => [...prev, text]);
    window.scrollTo(0, document.body.scrollHeight);
  };

  // ----------------------------------------------------------------------
  // KEY HANDLER
  // ----------------------------------------------------------------------
  const handleKeyUp = (e) => {
    if (!terminalData) return;

    if (e.key === "Enter") {
      const command = input.trim().toLowerCase();

      if (command) {
        setCommands((prev) => [...prev, command]);
        addLine(`<span class="command">&gt; ${command}</span>`);
        processCommand(command);
      }

      setInput("");
      setCommandIndex(-1);
    }

    if (e.key === "ArrowUp") {
      if (commandIndex > 0) {
        setCommandIndex((prev) => prev - 1);
        setInput(commands[commandIndex - 1]);
      }
    }

    if (e.key === "ArrowDown") {
      if (commandIndex < commands.length - 1) {
        setCommandIndex((prev) => prev + 1);
        setInput(commands[commandIndex + 1] || "");
      }
    }
  };

  // ----------------------------------------------------------------------
  // COMMAND HANDLER
  // ----------------------------------------------------------------------
  const processCommand = (cmd) => {
    switch (cmd) {
      case "help":
        loopLines(terminalData.help, 80);
        break;

      case "about":
        loopLines(terminalData.whois, 80);
        break;

      case "social":
        loopLines(terminalData.social, 80);
        break;

      case "projects":
        loopLines(terminalData.projects, 80);
        break;

      case "email":
        addLine(
          `Opening mailto: <a href="${terminalData.email}" target="_blank">${terminalData.email}</a>`
        );
        break;

      case "clear":
        setOutput([]);
        break;

      case "history":
        loopLines(
          commands.map((c) => `> ${c}`),
          80
        );
        break;

      default:
        addLine("Unknown command. Type 'help'");
    }
  };

  // ----------------------------------------------------------------------
  // UI
  // ----------------------------------------------------------------------
  return (
    <section className="Terminal  d-flex flex-column">
      <div className="app-bar">
        <div className="app-bar-button minimize"></div>
        <div className="app-bar-button maximize"></div>
        <div className="app-bar-button close"></div>
      </div>
      <div className="terminal terminal-border">
        <div className="terminal-output">
          {output.map((line, index) => (
            <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
          ))}
        </div>

        <div className="terminal-input">
          <span>&gt;</span>
          <input
            type="text"
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={handleKeyUp}
            disabled={!terminalData}
          />
        </div>
      </div>
    </section>
  );
};

export default Terminal;
