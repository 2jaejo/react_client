import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // v6: Routes와 Route 사용
import Main from './Main'; 
import Admin from './admin/Admin';

function App() {

  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Main />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
