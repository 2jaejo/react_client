import React, { useState } from 'react';

function Logs() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <h2>Logs</h2>
      <p>This is the Logs page.</p>
      <label>
        Enter some text: 
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <p>Input value: {inputValue}</p>
    </div>
  );
}

export default Logs;
