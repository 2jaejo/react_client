import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

function Logs() {
  const [searchQuery, setSearchQuery] = useState({});
  
  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearchData = (data) => {
    console.log("검색어:", data);
    setSearchQuery(data);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearchData} />
      <p>SearchBar 컴포넌트에서 전달된 데이터: {JSON.stringify(searchQuery, null, 2)}</p>
    </div>
  );
}

export default Logs;
