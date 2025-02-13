import React, { useState } from "react";
import SearchBar from "../components/SearchBar";

function Home() {
  
  const [inputId, setInputValue] = useState("");
  const [inputName, setInputValue2] = useState("");


  const [searchQuery, setSearchQuery] = useState({});
  // 동적으로 생성할 입력 필드
  const fields = [
    { name: 'dt', type: 'date', label: '날짜', default: new Date().toISOString().substring(0, 10)},
    { name: 'sel', type: 'select', label: '선택', default: '1', options: [
      {"key":'전체', 'value':''}, 
      {"key":'선택1', 'value':'1'}, 
      {"key":'선택2', 'value':'2'}, 
      {"key":'선택3', 'value':'3'}, 
    ]},
    { name: 'name', type: 'text', label: '이름', default: '홍길동' },
    { name: 'num', type: 'number', label: '번호', default: '1234'},
  ];
  
  // 검색창 데이터 변경시 호출되는 함수
  const handleSearchData = (data) => {
    setSearchQuery(data);
  };

  return (
    <div>
      <SearchBar id={"home"} fields={fields} onSearchData={handleSearchData} reset={true} />
      <p>SearchBar 컴포넌트에서 전달된 데이터: {JSON.stringify(searchQuery, null, 2)}</p>
    
      <label>
        Enter some id:
        <input
          type="text"
          value={inputId}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <p>Input id: {inputId}</p>

      <label>
        Enter some name:
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputValue2(e.target.value)}
        />
      </label>
      <p>Input name: {inputName}</p>
      
    </div>
  );
}

export default Home;
