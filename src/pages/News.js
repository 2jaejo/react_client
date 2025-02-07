import React, { useState, useEffect } from "react";
import Grid from "@toast-ui/react-grid";
import SearchBar from "../components/SearchBar";

function News() {
  const [searchQuery, setSearchQuery] = useState({});

  // 동적으로 생성할 입력 필드
  const fields = [
    { name: "date", type: "date", label: "날짜" },
    {
      name: "sel",
      type: "select",
      label: "선택",
      options: [
        { key: "전체", value: "" },
        { key: "선택1", value: "1" },
        { key: "선택2", value: "2" },
        { key: "선택3", value: "3" },
      ],
    },
    {
      name: "opt",
      type: "radio",
      label: "옵션",
      options: [
        { key: "옵션1", value: "1" },
        { key: "옵션2", value: "2" },
        { key: "옵션3", value: "3" },
      ],
    },
    {
      name: "chk",
      type: "checkbox",
      label: "체크",
      options: [
        { key: "체크1", value: "1" },
        { key: "체크2", value: "2" },
        { key: "체크3", value: "3" },
      ],
    },
    { name: "name", type: "text", label: "이름" },
    { name: "num", type: "number", label: "번호" },
  ];

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearchData = (data) => {
    console.log(data);
    setSearchQuery(data);
  };

  const test = (ev) => {
    // 기본적인 fetch GET 요청
    fetch("/test/get", {
      method: "POST",
      headers: {"Content-Type": "application/json",}
    })
      .then((response) => {
        // 응답이 성공적일 경우
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // JSON 형태로 변환
      })
      .then((data) => {
        console.log("Fetched Data:", data); // 데이터 출력
      })
      .catch((error) => {
        console.error("Fetch error:", error); // 오류 처리
      });
  };

  return (
    <div>
      <SearchBar 
        id={"news"} 
        fields={fields} 
        onSearchData={handleSearchData} 
        reset={true} 
      />
      <p>
        SearchBar 컴포넌트에서 전달된 데이터:{" "}
        {JSON.stringify(searchQuery, null, 2)}
      </p>
      <button type="button" className="btn btn-primary me-2" onClick={(ev) => test(ev)}> test </button>
    </div>
  );
}

export default News;
