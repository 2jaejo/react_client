import React, { useMemo, useCallback } from "react";

import { AgGridReact } from "ag-grid-react";
// Register all Community features
import { AllCommunityModule, ModuleRegistry, themeQuartz } from "ag-grid-community";
import { AG_GRID_LOCALE_KR } from '@ag-grid-community/locale';

ModuleRegistry.registerModules([AllCommunityModule]);

const GridExample = ( {columnDefs, rowData, loading=false, rowNum=false, rowSel="singleRow", onGridReady=null} ) => {

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
  const enchancedColumnDefs = useMemo(() => {
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


  // 기본 설정
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 110,
      filter: false,
      editable: false,
      sortable: false,
      unSortIcon: true, // 기본 정렬 아이콘 표시
      align:"center"
    };
  }, []);
  

  // 행 선택 설정
  const rowSelection = useMemo(() => {
    return { 
      mode: rowSel, // singleRow, multiRow
      headerCheckbox: true,
      checkboxes: (rowSel === "singleRow" ? false : true),
      enableClickSelection: true, // 클릭 선택 가능
      enableSelectionWithoutKeys:true, // 간은 행 클릭시 선택,취소
    };
  },[rowSel]);


  // 페이지 크기
  const paginationPageSizeSelector = useMemo(() => {
    return [5, 10, 50, 100, 500, 1000];
  }, []);


  // 페이지 포맷
  const paginationNumberFormatter = useCallback((params) => {
    return "[" + params.value.toLocaleString() + "]";
  }, []);


  // 로딩 컴포넌트
  const CustomLoadingOverlay = () => {
    return (
      <div className="ag-overlay-loading-center" role="presentation">
        <div aria-live="polite" aria-atomic="true" style={{padding:"10px"}}>
          로딩중입니다... abh
        </div>
      </div>
    )
  };


  // onGridReady 내부 핸들러 (기본 이벤트 자동 추가)
  const handleGridReady = useCallback((params) => {

    // 기본 이벤트 리스너 등록


    // 부모에서 전달한 onGridReady 실행 (있다면)
    if (onGridReady) {
      onGridReady(params);
    }
  }, [onGridReady]);



  // 스타일
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  
  
  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
          theme={myTheme}
          localeText={AG_GRID_LOCALE_KR}
          rowData={rowData}
          loading={loading}
          defaultColDef={defaultColDef}
          columnDefs={enchancedColumnDefs}
          rowSelection={rowSelection}
          rowModelType={"clientSide"}

          onGridReady={handleGridReady}
        
          // paginationAutoPageSize={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={paginationPageSizeSelector}
          paginationNumberFormatter={paginationNumberFormatter}

          loadingOverlayComponent={CustomLoadingOverlay}
        />
      </div>
    </div>
  );

};

export default GridExample;
