import logo from "./logo.svg";
import Header from "./layout/Header";
import Nav from "./layout/Nav";
import Aside from "./layout/Aside";
import Article from "./layout/Article";
import Footer from "./layout/Footer";

import React, { useState } from "react";

function App() {
  const [tabs, setTabs] = useState([
    
  ]);
  const [activeTab, setActiveTab] = useState(1); // 현재 활성화된 탭 ID

  // 탭 추가
  const addTab = () => {
    const newTabId = tabs.length + 1;
    setTabs((prev) => [
      ...prev,
      {
        id: newTabId,
        title: `Tab ${newTabId}`,
        content: `Content for Tab ${newTabId}`,
      },
    ]);
    setActiveTab(newTabId); // 새 탭 활성화
  };

  // 탭 삭제
  const removeTab = (id) => {
    setTabs((prev) => prev.filter((tab) => tab.id !== id));
    if (activeTab === id && tabs.length > 1) {
      setActiveTab(tabs[0].id); // 삭제 시 다른 탭 활성화
    }
  };

  return (
    <div className="app">
      <Header />
      <Nav />
      <div className="aside">
        <button className="add-tab-btn" onClick={addTab}>Add Tab</button>
      </div>
      <div className="article">
        <div className="tabs">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
              <button
                className="close-btn"
                onClick={(e) => {
                  e.stopPropagation(); // 부모 탭 클릭 이벤트 차단
                  removeTab(tab.id);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="tab-content">
          {tabs.find((tab) => tab.id === activeTab)?.content || "No Content Available"}
        </div>
      </div>
      <Footer />
      
    </div>
  );
}

export default App;
