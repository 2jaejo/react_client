import React, { useState } from 'react';

function News() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <h2>News</h2>
      <p>This is the News page.</p>
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

export default News;
