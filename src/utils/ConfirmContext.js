import React, { createContext, useContext, useState, useCallback } from "react";
import styles from '../css/ConfirmContext.module.css';

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [confirmState, setConfirmState] = useState({
    open: false,
  });

  const closeConfirm = useCallback(() => {
    setConfirmState((prev) => ({ ...prev, open: false }));
  }, []);

  const showConfirm = useCallback((options) => {
    return new Promise((resolve) => {
      setConfirmState(prev => ({
        title: "알림",
        message: "",
        confirmText: "확인",
        cancelText: "취소",
        open: true,
        ...options,
        onConfirm: () => {
          resolve(true);
          closeConfirm(); 
        },
        onCancel: () => {
          resolve(false);
          closeConfirm(); 
        },
      }));
    });
  }, [closeConfirm]);

  return (
    <ConfirmContext.Provider value={{ showConfirm, closeConfirm }}>
      {children}
      {confirmState.open &&
        <div className={styles.fullscreenCenter}>
          <div className={styles.modal}>
            <h4 style={{ fontWeight: "bold" }}>{confirmState.title}</h4>
            <div style={{ padding: "10px" }}>
              <span>{confirmState.message}</span>
            </div>
            <div className={styles.buttonContainer}>
              {confirmState.cancelText !== "" && 
                <button onClick={confirmState.onCancel} className={`${styles.button} ${styles.cancelButton}`}>{confirmState.cancelText}</button>
              }
              {confirmState.confirmText !== "" &&
              <button onClick={confirmState.onConfirm} className={`${styles.button} ${styles.confirmButton}`}>{confirmState.confirmText}</button>
              } 
            </div>
          </div>
        </div>
      }
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  return useContext(ConfirmContext);
};
