import React, { useState, useEffect } from "react";
import WebSocket from "../components/WebSocket";

// 유틸
import axiosInstance from "../utils/Axios";

function About() {
  const [inputValue, setInputValue] = useState("");
  const [isConnect, setIsConnect] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/auth/validate")
      .then((res) => {
        setIsConnect(true);
      })
      .catch((error) => {
        setIsConnect(false);
        console.error("Error fetching data:", error);
      });
  }, []);

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

      {isConnect ? (<WebSocket />) : (<div></div>)}
      
    </div>
  );
}

export default About;
