import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  // 여러 개의 입력 필드를 다룰 상태 (input, select 등을 포함)
  const [inputsState, setInputsState] = useState({
    input1: '',
    select1: '',
  });

  const [buttons, setButtons] = useState([
    { label: '검색', action: 'search' },
    { label: '초기화', action: 'reset' },
  ]);

  // 입력 값 변경 핸들러
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputsState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 버튼 클릭 시 처리되는 함수
  const handleButtonClick = (action) => {
    if (action === 'search') {
      // 검색 버튼 클릭 시 입력된 데이터를 JSON 형식으로 부모로 전달
      onSearch(inputsState);
    } else if (action === 'reset') {
      // 초기화 버튼 클릭 시 폼 초기화
      setInputsState({
        input1: '',
        select1: '',
      });
    }
  };

  return (
    <div>
      <form>
        {/* 동적으로 input 생성 */}
        <div>
          <label>입력 1: </label>
          <input
            type="text"
            name="input1"
            value={inputsState.input1}
            onChange={handleInputChange}
          />
        </div>

        {/* 동적으로 select 생성 */}
        <div>
          <label>선택 1: </label>
          <select
            name="select1"
            value={inputsState.select1}
            onChange={handleInputChange}
          >
            <option value="">--선택--</option>
            <option value="option1">옵션 1</option>
            <option value="option2">옵션 2</option>
          </select>
        </div>
      </form>

      {/* 여러 개의 버튼을 동적으로 생성 */}
      <div>
        {buttons.map((button, index) => (
          <button key={index} type="button" onClick={() => handleButtonClick(button.action)}>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
