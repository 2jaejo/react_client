import React, { useState } from 'react';

function Set() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <h2>Set</h2>
      <p>This is the Set page.</p>
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

export default Set;
