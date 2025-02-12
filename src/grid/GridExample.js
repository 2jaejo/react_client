import React, { useState, useMemo, useCallback, useRef, forwardRef, useImperativeHandle } from "react";

import { AgGridReact } from "ag-grid-react";
// Register all Community features
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AG_GRID_LOCALE_KR } from '@ag-grid-community/locale';

ModuleRegistry.registerModules([AllCommunityModule]);

const GridExample = forwardRef(({columnDefs, rowData, rowNum=false, rowSel="singleRow", onGridReady=null}, ref) => {
  
  // 테마설정
  const myTheme = themeQuartz // themeQuartz, themeBalham 
  .withParams({
      browserColorScheme: "inherit",
      fontFamily: [
          "Arial",
          "sans-serif"
      ],
      headerFontSize: 14
  });



  // 기본 설정 추가 = rowNum, editable: false일때 배경색
  const enhancedColumnDefs = useMemo(() => {
    let newColumnDefs = [];
    let rownumCol = { 
      headerName: "No.", 
      sortable: true, 
      valueGetter: (params) => params.node.rowIndex + 1, 
      minWidth:60,
      maxWidth:100,
    };

    if(rowNum){
      newColumnDefs = [rownumCol, ...columnDefs];
    }
    else{
      newColumnDefs = columnDefs;
    }

    // editable: false = background color set , text align
    return newColumnDefs.map((col) => ({
      ...col,
      cellStyle: (params) => {
        let result = {
          backgroundColor: params.colDef.editable ? "" : "#a7d1ff29",
          textAlign:params.colDef.align ? params.colDef.align : "",
        };
        return result;
      }
    }));

  }, [rowNum, columnDefs]);


  const gridRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);


  // 부모 컴포넌트에서 접근할 수 있는 메서드를 정의
  useImperativeHandle(ref, () => ({
    // AG Grid API를 부모에게 제공
    api: gridRef.current?.api,  

    getLoading: ()=>{
      return loading;
    },
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
      align:"center"
    };
  }, []);
  
  const rowSelection = useMemo(() => {
    return { 
      mode: rowSel, // singleRow, multiRow
      headerCheckbox: true,
      checkboxes: true,
      enableClickSelection: true,
    };
  },[rowSel]);

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
          localeText={AG_GRID_LOCALE_KR}
          ref={gridRef}
          rowData={rowData}
          loading={loading}
          defaultColDef={defaultColDef}
          columnDefs={enhancedColumnDefs}
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
