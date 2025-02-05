import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

function News() {
  const [searchQuery, setSearchQuery] = useState({});

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = (query) => {
    console.log("검색어:", query);
    setSearchQuery(query);
    // 실제 검색 처리 로직을 여기에 추가
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <p>SearchBar 컴포넌트에서 전달된 데이터: {JSON.stringify(searchQuery, null, 2)}</p>

    </div>
  );
}

export default News;
