import React, { createContext, useContext, useState, useCallback } from "react";
import styles from '../css/ConfirmModal.module.css';

const ConfirmContext = createContext();

export const ConfirmProvider = ({ children }) => {
  const [confirmState, setConfirmState] = useState({
    open: false,
    title: "",
    message: "",
    confirmText: "확인",
    cancelText: "취소",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const showConfirm = useCallback((options) => {
    return new Promise((resolve) => {
      setConfirmState({
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
      })
    });
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirmState((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <ConfirmContext.Provider value={{ showConfirm, closeConfirm }}>
      {children}
      <div className={styles.fullscreenCenter}>
      <div className={styles.modal}>
        <h4 style={{ fontWeight: "bold" }}>{confirmState.title}</h4>
        <p style={{ marginTop: "8px" }}>{confirmState.message}</p>
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
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  return useContext(ConfirmContext);
};
