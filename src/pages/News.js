import React, { useState, useRef } from "react";

import SearchBar from "../components/SearchBar";
import axiosInstance from "../utils/Axios";
import GridExample from "../components/GridExample";
import Buttons from "../components/Buttons";
import { useConfirm } from "../utils/ConfirmContext";

function News() {
  const gridRef = useRef();  

  const [loading, setLoading] = useState(false);
  const [rowData, setRowData] = useState();
  const [columnDefs] = useState([
    { headerName: "아이디", field: "id", sortable: true, },
    { headerName: "이름", field: "user_nm", filter: "agTextColumnFilter", editable: true, align:"left"},
    { headerName: "이메일", field: "user_mail", align:"right"},
  ]);

  const [searchQuery, setSearchQuery] = useState({});
  const { showConfirm } = useConfirm();

  // 동적으로 생성할 입력 필드
  const fields = [
    { name: "date", 
      type: "date", 
      label: "날짜", 
      default: new Date().toISOString().substring(0, 10), 
      className:"form-control form-control-sm",
    },
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
      className:"form-select form-select-sm",
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
      default:'1',
      className:"",
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
      className:"",
    },
    { name: "name", type: "text", label: "이름", className:"form-control form-control-sm", },
    { name: "num", type: "number", label: "번호", className:"form-control form-control-sm", },
  ];


  // 검색창 데이터 변경시 호출되는 함수
  const handleSearchData = (data) => {
    setSearchQuery(data);
  };


  // 조회
  const getData = (params) => {
    console.log("getData");

    setLoading(true);
    
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
        setLoading(false);
      }, delay);
        
    })
    .catch((error) => console.error("Error fetching data:", error));
    
  };

  // 수정
  const modifyData = (params) => {
    axiosInstance
      .put("/api/items", JSON.stringify(params))
      .then((res) => {
        getData();
      })
      .catch((error) => console.error("Error fetching data:", error));    
  };


  // 추가
  const createData = (params) => {

    if(searchQuery.name === ""){
      showConfirm({message:"이름이 없습니다.", cancelText:""});
      return;
    }

    let data = {
      name: searchQuery.name
    };

    // 모달 열기
    showConfirm({title: "추가", message: "진행하시겠습니까?"})
      .then((res)=>{
        console.log(res);
        if (res) {
          axiosInstance
            .post("/api/items", JSON.stringify(data))
            .then((res) => {
              getData();
            })
            .catch((error) => console.error("Error fetching data:", error));    
        }
      });
  };


  // 삭제
  const deleteData = (params) => {
    const selectRows = gridRef.current.getSelectedRows();

    if(selectRows.length === 0) {
      showConfirm({message:"선택된 항목이 없습니다.", cancelText:""});
      return;
    }

    // 모달 열기
    showConfirm({title: "삭제", message: "진행하시겠습니까?"})
      .then((res)=>{
        console.log(res);
        if (res) {
          // 나중에 데이터 전체 넘기고 batch 처리 필요
          selectRows.forEach( (el)=>{
            axiosInstance
            .delete(`/api/items/${el.id}`)
            .then((res) => {
              getData();
            })
            .catch((error) => console.error("Error fetching data:", error));    
          });
        }
      });
  };


  // onGridReady에서 이벤트 리스너 추가
  const onGridReady = (params) => {
    gridRef.current = params.api; // Grid API 저장
    getData();

    // 이벤트 리스너 시작

    // 셀 값 변경 이벤트
    params.api.addEventListener("cellValueChanged", (ev) => {
      const params = {
        id: ev.data.id,
        name: ev.data.user_nm
      };
      modifyData(params);
      // 수정된 row 배열에 저장
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
    });
    
    // 선택 변경 이벤트
    params.api.addEventListener("selectionChanged", (ev) => {
      console.log(ev);
    });

    // 이벤트 리스너 종료

  };


  // 버튼스 컴포넌트 데이터 
  const buttonData = [
    { label: "조회", className: "btn btn-sm btn-primary", onClick: getData },
    { label: "추가", className: "btn btn-sm btn-success", onClick: createData },
    { label: "삭제", className: "btn btn-sm btn-danger", onClick: deleteData },
  ];

 
  return (
    <div>

      <p>
        SearchBar 컴포넌트에서 전달된 데이터: {JSON.stringify(searchQuery, null, 2)}
      </p>

      <div className="py-2 d-flex justify-content-between align-items-center gap-3">
        <div>
          <SearchBar
            id={"news"}
            fields={fields}
            onSearchData={handleSearchData}
            reset={true}
          />
        </div>
        <div>
          <Buttons buttonData={buttonData}/>
        </div>
      </div>
      
      <div style={{height:"500px"}}>
        <GridExample 
          columnDefs={columnDefs}
          rowData={rowData}
          onGridReady={onGridReady} 
          loading={loading}
          rowNum={true}
          rowSel={"singleRow"}
        />
      </div>

    </div>
  );
}

export default News;
