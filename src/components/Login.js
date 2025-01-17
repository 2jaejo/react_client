// LoginForm.js
import React, { useState } from 'react';
import styles from '../css/Login.module.css';
import axiosInstance from "../utils/Axios";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [errorMessage, setErrorMessage] = useState('');

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
        onLogin(2);
      })
      .catch((error) => console.error("Login failed:", error));

    } catch (err) {
      console.error('Error during login:', err);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.wrap}>
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
          <button type="submit" className={styles.button}>확인</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
