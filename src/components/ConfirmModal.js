import React from "react";
import styles from '../css/ConfirmModal.module.css';

const ConfirmModal = ({
  open,
  title = "",
  message = "",
  confirmText = "확인",
  cancelText = "취소",
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className={styles.fullscreenCenter}>
      <div className={styles.modal}>
        <h4 style={{ fontWeight: "bold" }}>{title}</h4>
        <p style={{ marginTop: "8px" }}>{message}</p>

        <div className={styles.buttonContainer}>
          <button onClick={onCancel} className={`${styles.button} ${styles.cancelButton}`}>{cancelText}</button>
          <button onClick={onConfirm} className={`${styles.button} ${styles.confirmButton}`}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};





export default ConfirmModal;
