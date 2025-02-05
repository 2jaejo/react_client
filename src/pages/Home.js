import React, { useState, useEffect } from "react";
import Grid from "@toast-ui/react-grid";
import axiosInstance from "../utils/Axios";
import SearchBar from "../components/SearchBar";

function Home() {
  const [searchQuery, setSearchQuery] = useState({});
  
  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = (query) => {
    console.log("검색어:", query);
    setSearchQuery(query);
    // 실제 검색 처리 로직을 여기에 추가
  };

  const [inputId, setInputValue] = useState("");
  const [inputName, setInputValue2] = useState("");

  const [items, setItems] = useState([]);

  useEffect(() => {
    readData();
  }, []);

  const columns = [
    { header: "아이디", name: "id" },
    { header: "이름", name: "user_nm" },
    { header: "이메일", name: "user_mail" },
  ];

  //조회
  const readData = () => {
    axiosInstance
      .get("/api/items")
      .then((res) => {
        if (Array.isArray(res.data)){
          setItems(res.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));    

  };

  // 추가
  const createData = (ev) => {
    let params = {
      name: inputName
    };

    axiosInstance
      .post("/api/items", JSON.stringify(params))
      .then((res) => {
        readData();
      })
      .catch((error) => console.error("Error fetching data:", error));    
  };

  // 수정
  const updateData = (ev) => {
    let params = {
      id: inputId,
      name: inputName
    };
    axiosInstance
      .put("/api/items", JSON.stringify(params))
      .then((res) => {
        readData();
      })
      .catch((error) => console.error("Error fetching data:", error));    
  };

  // 삭제
  const deleteData = (ev) => {
    axiosInstance
      .delete(`/api/items/${inputId}`)
      .then((res) => {
        readData();
      })
      .catch((error) => console.error("Error fetching data:", error));    
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
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
      
      <div className="p-2">
        <button type="button" className="btn btn-primary me-2" onClick={(ev) => createData(ev)}> 저장 </button>
        <button type="button" className="btn btn-success me-2" onClick={(ev) => updateData(ev)}> 수정 </button>
        <button type="button" className="btn btn-danger" onClick={(ev) => deleteData(ev)}> 삭제 </button>
      </div>

      <Grid
        data={items}
        columns={columns}
        rowHeight={25}
        bodyHeight={300}
        heightResizable={true}
        rowHeaders={["rowNum"]}
      />

    </div>
  );
}

export default Home;
