// LoginForm.js
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from '../css/Login.module.css';
import axiosInstance from "../utils/Axios";

import Modal from "../components/Modal";
import Forms from "../components/Forms";


const LoginForm = () => {
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [errorMessage, setErrorMessage] = useState('');

  const modalRef = useRef();  
  const modalInputData = useRef(); 

  // 모달 입력필드 데이터 변경시 호출되는 함수
  const handleModalData = (data) => {
    modalInputData.current = data;
  };

  // 동적으로 생성할 입력 필드
  const fields = [
    { name: "date", 
      type: "date", 
      label: "날짜", 
      default: new Date().toISOString().substring(0, 10), 
      className:"form-control form-control-sm",
    },
    {
      name: "sel",
      type: "select",
      label: "선택",
      options: [
        { key: "전체", value: "" },
        { key: "선택1", value: "1" },
        { key: "선택2", value: "2" },
        { key: "선택3", value: "3" },
      ],
      className:"form-select form-select-sm",
    },
    {
      name: "opt",
      type: "radio",
      label: "옵션",
      options: [
        { key: "옵션1", value: "1" },
        { key: "옵션2", value: "2" },
        { key: "옵션3", value: "3" },
      ],
      default:'1',
      className:"",
    },
    {
      name: "chk",
      type: "checkbox",
      label: "체크",
      options: [
        { key: "체크1", value: "1" },
        { key: "체크2", value: "2" },
        { key: "체크3", value: "3" },
      ],
      className:"",
    },
    { name: "name", type: "text", label: "이름", className:"form-control form-control-sm", },
    { name: "num", type: "number", label: "번호", className:"form-control form-control-sm", },
  ];


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 로그인 요청을 서버로 전송
    try {
      axiosInstance
      .post("/auth/login",JSON.stringify({ email, password }))
      .then((res) => {
        const data = res.data;
        console.log(data.token);
        // 성공적으로 로그인하면 토큰을 로컬스토리지에 저장
        localStorage.setItem('accessToken', data.token);
        navigate('/'); 
      })
      .catch((error) => console.error("Login failed:", error));

    } catch (err) {
      console.error('Error during login:', err);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const joinUs = (e)=> {
    modalRef.current.open({
      title:"회원가입",
      content:
        <div className={"p-2"}>
          
          <div className={"p-2"}>
            <Forms
              id={"test"}
              fields={fields}
              onSearchData={handleModalData}
              direction={"vertical"}
              />
          </div>
        </div>
      ,
      onCancel:()=>{
        modalRef.current.close();
      },
      onConfirm:(res) => {
        console.log(res);
        console.log(modalInputData.current);
      },
    });
  };


  return (
    <div className={styles.wrap}>
      <Modal ref={modalRef} />
      
      <div className={styles.container}>
        <h2 className={styles.heading}>로그인</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>아이디:</label>
            <input
              type="text"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>비밀번호:</label>
            <input
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-around align-items-center gap-2">
            <button type="button" className={styles.buttonJoin} onClick={joinUs}>회원가입</button>
            <button type="submit" className={styles.buttonLogin}>확인</button>
          </div>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
