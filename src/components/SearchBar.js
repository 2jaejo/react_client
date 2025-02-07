import React, { useState, useEffect } from "react";

const SearchBar = ({ id, fields, onSearchData, reset=false }) => {
  const [actionType, setActionType] = useState(null);

  // 입력 필드 상태 관리 (JSON 형태)
  const [inputsState, setInputsState] = useState(
    fields.reduce((acc, field) => {
      acc[`${id}_${field.name}`] = ""; // 기본값 설정
      return acc;
    }, {})
  );

  // 입력 필드 상태 관리 (JSON 형태)
  const [inputsState2, setInputsState2] = useState({});

  // aState가 변경될 때 bState를 업데이트
  useEffect(() => {
    console.log(inputsState);
    const str = `${id}_`;
    const filteredValue = Object.entries(inputsState).reduce((acc, [key,value]) => {
      const newKey = key.replace(str, "");
      acc[newKey] = value; // 기본값 설정
      return acc;
    }, {})
    setInputsState2(filteredValue);
  }, [inputsState]); // aState가 변경될 때 실행


  // 입력 값 변경 핸들러
  const handleInputChange = (event) => {
    if (event.target.type === "checkbox") {
      const { name, value } = event.target;
      
      setInputsState((prev) => {
        const prevValue = prev[name];
        const nextValue = prevValue.includes(value)
          ? prevValue.filter((v) => v !== value)
          : [...prevValue, value];
        return {
          ...prev,
          [name]: nextValue,
        };
      });

    }
    else {
      const { name, value } = event.target;
      setInputsState((prev) => ({
        ...prev,
        [name]: value,
      }));

    }

  };

  // 버튼 클릭 이벤트 처리
  const handleButtonClick = (action) => {
    setActionType(action);
    if (action === "search") {
      onSearchData(inputsState2);
    } 
    else if (action === "reset") {
      const reset = fields.reduce((acc, field) => {
        acc[field.name] = ""; // 모든 입력값 초기화
        return acc;
      }, {})
      setInputsState(reset);
    }
  };

  useEffect(() => { 
    if (actionType === "reset") {
      onSearchData(inputsState2);
      setActionType(null); // 초기화
    }
  }, [inputsState]); // inputsState가 변경될 때만 실행


  // 입력 필드 생성
  const createInput = (field) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type={field.type}
            name={field.name}
            value={inputsState[field.name]}
            onChange={handleInputChange}
            style={styles.input}
            maxLength="50"
          />
        );
      case "number":
        return (
          <input
            type="text"
            name={field.name}
            inputMode="numeric" 
            pattern="[0-9]*"
            value={inputsState[field.name]}
            onChange={(e) => {
              // 숫자 제외한 문자 제거
              const filteredValue = e.target.value = e.target.value.replaceAll(/\D/g, "");
              setInputsState((prev) => ({
                ...prev,
                [field.name]: filteredValue,
              }));
            }}
            onKeyDown={(e)=>{
              if (!/^\d$/.test(e.key) && e.key !== "Backspace") {
                e.preventDefault(); // 숫자와 백스페이스 외 입력 방지
              }
            }}
            onPaste={(e) => {
              const pasteData = e.clipboardData.getData("text");
              if (!/^\d+$/.test(pasteData)) {
                e.preventDefault(); // 붙여넣기로 문자가 입력되지 않도록 방지
              }
            }} 
            style={styles.input}
            maxLength="50"
          />
        );
      case "select":
        return (
          <select
              name={field.name}
              value={inputsState[field.name]}
              onChange={handleInputChange}
              style={styles.input}
            >
              {field.options.map((option, idx) => (
                <option key={idx} value={option.value}>
                  {option.key}
                </option>
              ))}
            </select>
        );
      case "radio":
        return (
          <div style={styles.radioGroup}>
            {field.options.map((option, idx) => (
              <div key={idx} style={styles.radioItem}>
                <input
                  type="radio"
                  id={`${id}_${field.type}-${field.name}-${option.value}`} // id로 고유값 설정
                  name={`${id}_${field.name}`} // name 속성은 같은 그룹으로 묶이게
                  value={option.value} // 각 옵션의 value 설정
                  checked={inputsState[`${id}_${field.name}`] === option.value} // 선택된 값 확인
                  onChange={handleInputChange} // 값 변경 시 상태 업데이트
                />
                <label htmlFor={`${id}_${field.type}-${field.name}-${option.value}`}>{option.key}</label>
              </div>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div style={styles.checkboxGroup}>
            {field.options.map((option, idx) => (
              <div key={idx} style={styles.checkboxItem}>
                <input
                  type="checkbox"
                  id={`${id}_${field.type}-${field.name}-${option.value}`} // id로 고유값 설정
                  name={`${id}_${field.name}`} // name 속성은 여러 체크박스를 하나의 그룹으로 묶음
                  value={option.value} // 각 옵션의 value 설정
                  checked={inputsState[`${id}_${field.name}`].includes(option.value)} // 선택된 체크박스 확인
                  onChange={handleInputChange} // 값 변경 시 상태 업데이트
                />
                <label htmlFor={`${id}_${field.type}-${field.name}-${option.value}`}>{option.key}</label>
              </div>
            ))}
          </div>
        );
      case "date":
        return (
          <input
            type={field.type}
            name={field.name}
            value={inputsState[field.name]}
            onChange={handleInputChange}
            style={styles.input}
            maxLength="50"
          />
        );
      default:
        return null;
    }
  }


  return (
    <div style={styles.searchBar}>
      {/* 동적으로 input 생성 */}
      <div style={styles.inputContainer}>
        {fields.map((field, index) => (
          <div key={index} style={styles.inputSubContainer}>
            <label style={styles.label}>{field.label}: </label>
            {createInput(field)}
          </div>
        ))}
      </div>

      {/* 여러 개의 버튼을 동적으로 생성 */}
      <div style={styles.buttonContainer}>
        <button
          className="btn btn-primary"
          key={1}
          type="button"
          onClick={() => handleButtonClick("search")}
        >
          {"검색"}
        </button>
        {reset && 
          <button
            className="btn btn-secondary"
            key={2}
            type="button"
            onClick={() => handleButtonClick("reset")}
          >
            {"초기화"}
          </button>
        }
      </div>
    </div>
  );
};

// 스타일 객체
const styles = {
  searchBar: {
    display: "flex",
    justifyContent: "space-between", 
    alignItems: "center",
    gap: "10px", 
    flexWrap: "wrap", 
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
  },
  inputSubContainer: {
    display: "flex",
    alignItems: "center",
    marginRight: "10px",
  },
  label: {
    marginRight: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "5px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  radioGroup: {
    display: 'flex',           
    justifyContent: 'flex-start',
    gap: '10px',             
  },
  radioItem: {
    display: 'flex',
    alignItems: 'center',
  },
  checkboxGroup: {
    display: 'flex',                
    flexDirection: 'row',           
    gap: '10px',                   
  },
  checkboxItem: {
    display: 'flex',
    alignItems: 'center',           
  },
  buttonContainer: {
    display: "flex",
    gap: "5px",
  },
};

export default SearchBar;
