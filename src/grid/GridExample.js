import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import axiosInstance from "../utils/Axios";

import { AgGridReact } from "ag-grid-react";
// Register all Community features
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

const GridExample = () => {
  const gridRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState();

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 110,
      editable: true,
    };
  }, []);

  const [columnDefs] = useState([
    { headerName: "아이디", field: "id", sortable: true, filter: false, editable:false },
    { headerName: "이름", field: "user_nm", sortable: true, filter: "agTextColumnFilter" ,editable:true},
    { headerName: "이메일", field: "user_mail", sortable: true, filter: "agNumberColumnFilter", editable:false },

  ]);

  // 조회
  const onGridReady = useCallback((params) => {
    console.log("onGridReady");
    if (!gridRef.current) return;

    const dataSource = {
      rowCount: null, // 전체 개수 모를 경우 null
      getRows: async (params) => {
        console.log("Loading Data ...");
        console.log("요청된 데이터 범위:", params.startRow, " to ", params.endRow);
        
        try {
          const response = await fetch(
            `/api/items?start=${params.startRow}&limit=${params.endRow - params.startRow}`
            , {method: "GET", headers: { "Content-Type": "application/json"}
          });
          const data = await response.json();
          params.successCallback(data, data.length);
        } catch (error) {
          console.error("데이터 로딩 실패:", error);
          params.failCallback();
        } finally{
          setLoading(false);
        }
      },
    };

    params.api.setGridOption("datasource", dataSource);
  }, []);

  // 수정
  const modifyData = useCallback((params) => {
    axiosInstance
      .put("/api/items", JSON.stringify(params))
      .then((res) => {
        if (200 < res.status && res.status < 300){
          gridRef.current.api.refreshInfiniteCache(); 
        }
      })
      .catch((error) => console.error("Error fetching data:", error));    
  })

  // cell edit start
  const onCellEditingStarted = useCallback((ev) => {
    console.log("cellEditingStarted");
  }, []);

  // cell edit end
  const onCellEditingStopped = useCallback((ev) => {
    console.log("cellEditingStopped");
  }, []);

  // cell edit end
  const onCellValueChanged  = useCallback((ev) => {
    console.log("onCellValueChanged ");
    console.log(ev);
    if (ev.oldValue !== ev.newValue){
      const params = {
        id: ev.data.id,
        name: ev.data.user_nm
      };
      setLoading(true);
      modifyData(params);
    }
  }, []);

  

  
  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
          ref={gridRef}
          loading={loading}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}

          domLayout={"autoHeight"}
          rowModelType={"infinite"}
    
          onGridReady={onGridReady}
          onCellEditingStarted={onCellEditingStarted}
          onCellEditingStopped={onCellEditingStopped}
          onCellValueChanged ={onCellValueChanged }
        />
      </div>
    </div>
  );
};

export default GridExample;
