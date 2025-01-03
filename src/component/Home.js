import React, { useState, useEffect } from "react";
import Grid from "@toast-ui/react-grid";

function Home() {
  const [inputValue, setInputValue] = useState("");

  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("/api/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = [
    { header: "ID", name: "id" },
    { header: "NAME", name: "name" },
  ];

  return (
    <div>
      <h2>Home</h2>
      <p>This is the Home page.</p>
      <label>
        Enter some text:
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <p>Input value: {inputValue}</p>
      
      <button type="button" className="btn btn-primary">
        저장
      </button>

      <Grid
        data={items}
        columns={columns}
        rowHeight={25}
        bodyHeight={100}
        heightResizable={true}
        rowHeaders={["rowNum"]}
        F
      />

    </div>
  );
}

export default Home;
