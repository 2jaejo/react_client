import React, { useState } from 'react';

function Help() {
  const [inputValue, setInputValue] = useState('');
  
  return (
    <div>
      <h2>Help</h2>
      <p>This is the Help page.</p>
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

export default Help;
