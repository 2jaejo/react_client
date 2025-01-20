import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // v6: Routes와 Route 사용

import Main from './Main'; 
import Admin from './admin/Admin';
import Login from './components/Login';

// 유틸
import axiosInstance from "./utils/Axios";

// 보호된 메인 컴포넌트 (로그인 필요)
const ProtectedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/auth/validate")
      .then((res) => {
        console.log("app.js validate ok");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate("/login");
      });
  }, [navigate]);

  return <Main />
};

function App() {
  
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<ProtectedPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
