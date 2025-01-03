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

  // 저장
  const btnSave = (ev) => {
    console.log(ev);
    console.log(inputValue);

    let params = {
      name: inputValue
    };
    fetch("/api/items", {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(params)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  // 삭제
  const btnDel = (ev) => {
    console.log(ev);
    console.log(inputValue);

    fetch(`/api/items/${inputValue}`, {
      method:'DELETE'
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

      })
      .catch((error) => console.error("Error fetching data:", error));
  };

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
      
      <div className="p-2">
        <button type="button" className="btn btn-primary me-2" onClick={(ev) => btnSave(ev)}> 저장 </button>
        <button type="button" className="btn btn-danger" onClick={(ev) => btnDel(ev)}> 삭제 </button>
      </div>

      <Grid
        data={items}
        columns={columns}
        rowHeight={25}
        bodyHeight={100}
        heightResizable={true}
        rowHeaders={["rowNum"]}
      />

    </div>
  );
}

export default Home;
