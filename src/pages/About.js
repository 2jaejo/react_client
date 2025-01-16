import React, { useState } from "react";
import WebSocket from "../components/WebSocket";

function About() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div>
      <h2>About</h2>
      <p>This is the About page.</p>
      <label>
        Enter some text:
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <p>Input value: {inputValue}</p>

      <WebSocket />
    </div>
  );
}

export default About;
