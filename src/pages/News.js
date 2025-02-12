import React, { useState, useRef } from "react";

import SearchBar from "../components/SearchBar";
import axiosInstance from "../utils/Axios";
import GridExample from "../grid/GridExample";
import Buttons from "../components/Buttons";
import { useConfirm } from "../utils/ConfirmContext";

function News() {
  const gridRef = useRef(null);  // AG Grid 인스턴스를 저장할 ref = forwardRef 사용(자식컴포넌트 메서드 추가가능)
  const gridRef2 = useRef(null);  // AG Grid 인스턴스를 저장할 ref2 = onGridReady 사용

  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { headerName: "아이디", field: "id", sortable: true, },
    { headerName: "이름", field: "user_nm", filter: "agTextColumnFilter", editable: true, align:"left"},
    { headerName: "이메일", field: "user_mail", align:"right"},
  ]);

  const [searchQuery, setSearchQuery] = useState({});
  const [inputName, setInputName] = useState("");
  const { showConfirm } = useConfirm();

  // 동적으로 생성할 입력 필드
  const fields = [
    { name: "date", type: "date", label: "날짜", default: new Date().toISOString().substring(0, 10) },
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


  // 검색창 데이터 변경시 호출되는 함수
  const handleSearchData = (data) => {
    setSearchQuery(data);
  };


  // 조회
  const getData = (params) => {
    console.log("getData");

    let ref = gridRef.current;
    ref?.setLoading(!ref.getLoading());
    
    const queryString = new URLSearchParams(searchQuery).toString();
    
    const startTime = Date.now(); // 요청 전 시간 기록
    axiosInstance
      .get(`/api/items?${queryString}`)
      .then((res) => {
        const endTime = Date.now(); // 응답 시간을 측정
        const responseTime = endTime - startTime; // 응답 시간 (밀리초)
        const delay = responseTime < 300 ? 300 - responseTime : 0; // 응답 시간이 0.5초보다 빠르면 남은 시간만큼 지연
        // 지연 후 응답을 출력
        setTimeout(async () => {
          setRowData(res.data);
          let ref = gridRef.current;
          ref?.setLoading(!ref.getLoading());
        }, delay);
        
      })
      .catch((error) => console.error("Error fetching data:", error));
    
  };

  // 수정
  const modifyData = (params) => {
    console.log("modifyData");
    console.log(searchQuery);

    axiosInstance
      .put("/api/items", JSON.stringify(params))
      .then((res) => {
        getData();
      })
      .catch((error) => console.error("Error fetching data:", error));    
  };


  // 추가
  const createData = (params) => {
    console.log("createData");
    let data = {
      name: inputName
    };

    axiosInstance
      .post("/api/items", JSON.stringify(data))
      .then((res) => {
        getData();
      })
      .catch((error) => console.error("Error fetching data:", error));    
  };


  // 삭제
  const deleteData = (params) => {
    console.log("deleteData");

    const selectRows = gridRef.current.api.getSelectedRows();
    console.log(selectRows);

    // 나중에 데이터 전체 넘기고 batch 처리 필요
    selectRows.forEach( (el)=>{
      axiosInstance
        .delete(`/api/items/${el.id}`)
        .then((res) => {
          getData();
        })
        .catch((error) => console.error("Error fetching data:", error));    

    });
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
    console.log("onGridReady");
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


  // 추가버튼 콜백
  const openModal = () => {
    // 모달 열기
    showConfirm({title: "확인", message: "정말로 진행하시겠습니까?"})
      .then((res)=>{
        console.log(res);
        if (res) {

        }
        else{
    
        }
      });
  };


  const buttonData = [
    { label: "조회", className: "btn btn-primary", onClick: getData },
    { label: "추가", className: "btn btn-success", onClick: openModal },
    { label: "삭제", className: "btn btn-danger", onClick: deleteData },
  ];

 
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

      <div className="p-2 d-flex justify-content-start align-items-center gap-3">
        <div className="flex-1">
          <input
            type="text"
            className="form-control"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
          />
        </div>
        <div className="flex-2">
          <Buttons buttonData={buttonData} align={"start"}/>
        </div>
      </div>
      
      <div style={{height:"500px"}}>
        <GridExample 
          ref={gridRef}  // 부모에서 자식에게 ref 전달
          columnDefs={columnDefs}
          rowData={rowData}
          onGridReady={onGridReady} 
          rowNum={true}
        />
      </div>

    </div>
  );
}

export default News;
