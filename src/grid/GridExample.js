import React, { useState, useMemo, useCallback, useRef, forwardRef, useImperativeHandle } from "react";

import { AgGridReact } from "ag-grid-react";
// Register all Community features
import { AllCommunityModule, ModuleRegistry, themeQuartz, themeBalham} from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

const GridExample = forwardRef(({columnDefs, rowData, rowSel="singleRow", onGridReady=null}, ref) => {
  // to use myTheme in an application, pass it to the theme grid option
  const myTheme = themeQuartz // themeQuartz, themeBalham 
  .withParams({
      browserColorScheme: "inherit",
      fontFamily: [
          "Arial",
          "sans-serif"
      ],
      headerFontSize: 14
  });

  const gridRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

  // 부모 컴포넌트에서 접근할 수 있는 메서드를 정의
  useImperativeHandle(ref, () => ({
    api: gridRef.current?.api,  // AG Grid API를 부모에게 제공
    getLoading: loading,
    setLoading: (state)=>{
      setLoading(state);
    },
  }));
  
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 110,
      filter: false,
      editable: false,
      sortable: false,
    };
  }, []);
  
  const rowSelection = useMemo(() => {
    return { 
      mode: rowSel, // singleRow, multiRow
      headerCheckbox: true,
      checkboxes: true,
      enableClickSelection: true,
    };
  },[]);

  const paginationPageSizeSelector = useMemo(() => {
    return [5, 10, 50, 100, 500, 1000];
  }, []);

  const paginationNumberFormatter = useCallback((params) => {
    return "[" + params.value.toLocaleString() + "]";
  }, []);

  
  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
        theme={myTheme}
          ref={gridRef}
          rowData={rowData}
          loading={loading}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
          rowSelection={rowSelection}
          rowModelType={"clientSide"}

          onGridReady={onGridReady}
        
          // paginationAutoPageSize={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={paginationPageSizeSelector}
          paginationNumberFormatter={paginationNumberFormatter}
        />
      </div>
    </div>
  );

});

export default GridExample;
