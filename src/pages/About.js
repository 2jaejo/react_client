import React, { useState, useEffect } from "react";
import WebSocket from "../components/WebSocket";
import SearchBar from "../components/SearchBar";

// 유틸
import axiosInstance from "../utils/Axios";

function About() {
  const [isConnect, setIsConnect] = useState(false);
  const [searchQuery, setSearchQuery] = useState({});

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = (query) => {
    console.log("검색어:", query);
    setSearchQuery(query);
    // 실제 검색 처리 로직을 여기에 추가
  };

  useEffect(() => {
    axiosInstance
      .get("/auth/validate")
      .then((res) => {
        setIsConnect(true);
      })
      .catch((error) => {
        setIsConnect(false);
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <p>SearchBar 컴포넌트에서 전달된 데이터: {JSON.stringify(searchQuery, null, 2)}</p>
      
      {isConnect ? <WebSocket /> : <div></div>}
    </div>
  );
}

export default About;
