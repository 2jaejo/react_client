import React, { useState } from "react";
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

  return (
    <div>
      <SearchBar id={"news"} fields={fields} reset={true} onSearchData={handleSearchData} />
      <p>
        SearchBar 컴포넌트에서 전달된 데이터:{" "}
        {JSON.stringify(searchQuery, null, 2)}
      </p>
    </div>
  );
}

export default News;
