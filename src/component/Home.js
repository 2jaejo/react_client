import React, { useState, useEffect } from "react";
// import { Grid } from 'tui-grid/dist/tui-grid.js';

function Home() {
  const [inputValue, setInputValue] = useState("");

  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch("/api/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  // const grid = new Grid({
  //   el: document.getElementById('grid-test'),
  //   columns:[
  //     {header:'1.header', name:'1.name'},
  //     {header:'2.header', name:'2.name'},
  //     {header:'3.header', name:'3.name'},
  //     {header:'4.header', name:'4.name'},
  //   ],
  //   data:[
  //     {name:"name1"},
  //     {name:"name2"},
  //     {name:"name3"}
  //   ]

  // });
  // grid.resetData();


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

      <div className="server-data">
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
      
      <div id="grid-test"></div>
    </div>
  );
}

export default Home;
