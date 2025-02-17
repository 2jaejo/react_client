import React, { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import styles from '../css/Modal.module.css';
import SearchBar from "../components/SearchBar";


const Modal = forwardRef(( _, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const confirmDataRef = useRef(null);

  const [modalOptions, setModalOptions] = useState({
    title:"알림",
    message:"",
    fields:[],
    cancelText:"취소",
    confirmText:"확인",
    onCancel:()=>{setIsOpen(false)},
    onConfirm:()=>{setIsOpen(false)},
  });

  // 부모 컴포넌트에서 ref를 통해 open, close를 호출할 수 있도록 설정
  useImperativeHandle(ref, () => ({
    open: (options = {}) => {
      setModalOptions((prevOptions) => ({ 
        title:"알림",
        message:"",
        fields:[],
        cancelText:"취소",
        confirmText:"확인",
        onCancel:()=>{setIsOpen(false)},
        onConfirm:()=>{setIsOpen(false)},
        ...options 
      })); // 옵션 업데이트
      setIsOpen(true);
    },
    close: () => setIsOpen(false),
  }));

  // 데이터 변경시 호출되는 함수
  const handleChangeData = (data) => {
    confirmDataRef.current = data;
  };

  const onCancle = (() => {
    modalOptions.onCancel({status:false, data:confirmDataRef.current});
  });
  
  const onConfirm = (() => {
    modalOptions.onConfirm({status:true, data:confirmDataRef.current});
  });


  if (!isOpen) return null;

  return (
    <div className={styles.fullscreenCenter}>
      <div className={styles.modal}>
        {/* title */}
        {modalOptions.title && (
          <h4 style={{ fontWeight: "bold" }}>{modalOptions.title}</h4>
        )}

        {/* message */}
        {modalOptions.message && (
          <div style={{ padding: "10px" }}>
            <span>{modalOptions.message}</span>
          </div>
        )}
        
        {/* 동적 input 생성 */}
        {modalOptions.fields && (
          <div style={{ padding: "10px" }}>
            <SearchBar
              id={"formContext"}
              fields={modalOptions.fields}
              onSearchData={handleChangeData}
            />
          </div>
        )}

        {/* button */}
        <div className={styles.buttonContainer}>
          {modalOptions.cancelText !== "" && (
            <button
              onClick={onCancle}
              className={`${styles.button} ${styles.cancelButton}`}
            >
              {modalOptions.cancelText}
            </button>
          )}

          {modalOptions.confirmText !== "" && (
            <button
              onClick={onConfirm}
              className={`${styles.button} ${styles.confirmButton}`}
            >
              {modalOptions.confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

export default Modal;