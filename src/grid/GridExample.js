import React, { useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
// Register all Community features
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

const GridExample = () => {
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 110,
      editable: true,
    };
  }, []);

  const [columnDefs] = useState([
    { headerName: "ID", field: "id", sortable: true, filter: false },
    { headerName: "이름", field: "name", sortable: true, filter: "agTextColumnFilter" },
    { headerName: "나이", field: "age", sortable: true, filter: "agNumberColumnFilter" },
    { headerName: "국가", field: "country", sortable: true, filter: false }
  ]);

  const [rowData] = useState([
    { id: 1, name: "홍길동", age: 25, country: "한국" },
    { id: 2, name: "Alice", age: 30, country: "미국" },
    { id: 3, name: "Bob", age: 28, country: "영국" },
    { id: 4, name: "김철수", age: 32, country: "한국" },
    { id: 5, name: "John", age: 27, country: "캐나다" }
  ]);

  const onCellEditingStarted = useCallback((ev) => {
    console.log("cellEditingStarted");
  }, []);

  const onCellEditingStopped = useCallback((ev) => {
    console.log("cellEditingStopped");
    console.log(ev);
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <AgGridReact
        domLayout={"autoHeight"}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowData={rowData}
        onCellEditingStarted={onCellEditingStarted}
        onCellEditingStopped={onCellEditingStopped}
        // pagination={true}
        // paginationPageSize={3}
      />
    </div>
  );
};

export default GridExample;
