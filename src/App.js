import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // v6: Routes와 Route 사용

import Main from './Main'; 
import Admin from './admin/Admin';
import Login from './components/Login';

// 유틸
import axiosInstance from "./utils/Axios";
// 테마
import { GlobalProvider } from "./utils/GlobalContext";

// 보호된 메인 컴포넌트 (로그인 필요)
const ProtectedPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/auth/validate")
      .then((res) => {
        console.log("app.js validate ok");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        navigate("/login");
      });
  }, [navigate]);

  if (loading) return <div></div>;

  return <Main />;
};

function App() {
  
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
}

export default App;
