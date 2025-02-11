import React, { useState, useEffect, useRef, useCallback } from "react";

import SearchBar from "../components/SearchBar";
import axiosInstance from "../utils/Axios";
import GridExample from "../grid/GridExample";

function News() {
  const gridRef = useRef(null);  // AG Grid 인스턴스를 저장할 ref
  const gridRef2 = useRef(null);  // AG Grid 인스턴스를 저장할 ref

  const [rowData, setRowData] = useState();
  const cellClass = "non-editable-cell";
  const [columnDefs] = useState([
    { headerName: "#", sortable: true, valueGetter: (params) => params.node.rowIndex + 1, cellClass: cellClass},
    { headerName: "아이디", field: "id", sortable: true, cellClass: cellClass},
    { headerName: "이름", field: "user_nm", filter: "agTextColumnFilter", editable: true, },
    { headerName: "이메일", field: "user_mail", cellClass: cellClass},
  ]);

  const [searchQuery, setSearchQuery] = useState({});
  const [inputId, setInputId] = useState("");
  const [inputName, setInputName] = useState("");
  const [items, setItems] = useState([]);

  const dt = new Date().toISOString().substring(0, 10);

  // 동적으로 생성할 입력 필드
  const fields = [
    { name: "date", type: "date", label: "날짜", default: dt },
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
      default:'1'
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

    console.log(gridRef);
    let ref = gridRef.current;
    ref.setLoading(!ref.getLoading);
  
  };


  // 조회
  const getData = (params) => {
    console.log("getData");

    let ref = gridRef.current;
    ref.setLoading(!ref.getLoading);

    axiosInstance
      .get("/api/items")
      .then((res) => {
        setRowData(res.data);
        
        let ref = gridRef.current;
        ref.setLoading(!ref.getLoading);
      })
      .catch((error) => console.error("Error fetching data:", error));
    
  };


  // 수정
  const modifyData = (params) => {
    console.log("modifyData");

    axiosInstance
      .put("/api/items", JSON.stringify(params))
      .then((res) => {
        getData();
      })
      .catch((error) => console.error("Error fetching data:", error));    
  };


  // const updateChangedRows = (row) =>{
  //   const idx = changedRowsRef.current.findIndex(el => el.id === row.id);
  //   if (idx !== -1){
  //     changedRowsRef.current[idx] = row;
  //   }
  //   else {
  //     changedRowsRef.current.push(row);
  //   }
  //   console.log(changedRowsRef.current);
  // } 


  // onGridReady에서 이벤트 리스너 추가
  const onGridReady = (params) => {
    console.log(params);

    getData();

    gridRef2.current = params.api; // Grid API 저장2

    // 이벤트 리스너 추가
    params.api.addEventListener("cellValueChanged", (ev) => {
      console.log(ev);

      const params = {
        id: ev.data.id,
        name: ev.data.user_nm
      };
      modifyData(params);
      // updateChangedRows(ev.data);
    });
    
    params.api.addEventListener("selectionChanged", (ev) => {
      console.log(ev);
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
      
      <div style={{height:"500px"}}>
        <GridExample 
          ref={gridRef}  // 부모에서 자식에게 ref 전달
          columnDefs={columnDefs}
          rowData={rowData}
          onGridReady={onGridReady} 
        />
      </div>

    </div>
  );
}

export default News;
