import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import styles from '../css/ConfirmContext.module.css';
import SearchBar from "../components/SearchBar";

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const confirmDataRef = useRef(null);
  
  const [confirmState, setConfirmState] = useState({
    open: false,
  });

  // 데이터 변경시 호출되는 함수
  const handleChangeData = (data) => {
    confirmDataRef.current = data;
  };

  const closeConfirm = useCallback(() => {
    setConfirmState((prev) => ({ ...prev, open: false }));
  }, []);

  
  const showConfirm = useCallback((options) => {
    return new Promise((resolve) => {
      setConfirmState((prev) => ({
        title: "알림",
        message: "",
        confirmText: "확인",
        cancelText: "취소",
        open: true,
        ...options,
        onConfirm: () => {
          console.log("onConfirm");
          const result = {
            status: true,
            data:confirmDataRef.current
          }
          resolve(result);
          closeConfirm();
        },
        onCancel: () => {
          console.log("onCancel");
          const result = {
            status: false,
            data:{}
          }
          resolve(result);
          closeConfirm();
        },
      }));
    });
  },[]);
    

  return (
    <ConfirmContext.Provider value={{ showConfirm, closeConfirm }}>
      {children}
      {confirmState.open && (
        <div className={styles.fullscreenCenter}>
          <div className={styles.modal}>
            {/* title */}
            {confirmState.title && (
              <h4 style={{ fontWeight: "bold" }}>{confirmState.title}</h4>
            )}

            {/* message */}
            {confirmState.message && (
              <div style={{ padding: "10px" }}>
                <span>{confirmState.message}</span>
              </div>
            )}
            
            {/* 동적 input 생성 */}
            {confirmState.fields && (
              <div style={{ padding: "10px" }}>
                <SearchBar
                  id={"formContext"}
                  fields={confirmState.fields}
                  onSearchData={handleChangeData}
                />
              </div>
            )}

            {/* button */}
            <div className={styles.buttonContainer}>
              {confirmState.cancelText !== "" && (
                <button
                  onClick={confirmState.onCancel}
                  className={`${styles.button} ${styles.cancelButton}`}
                >
                  {confirmState.cancelText}
                </button>
              )}
              {confirmState.confirmText !== "" && (
                <button
                  onClick={confirmState.onConfirm}
                  className={`${styles.button} ${styles.confirmButton}`}
                >
                  {confirmState.confirmText}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  return useContext(ConfirmContext);
};
