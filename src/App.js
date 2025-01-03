import logo from "./logo.svg";
import Header from "./layout/Header";
import Nav from "./layout/Nav";
import Aside from "./layout/Aside";
import Article from "./layout/Article";
import Footer from "./layout/Footer";

import React, { useState } from "react";

// 각 탭에 연결할 컴포넌트 가져오기
import Home from "./component/Home";
import About from "./component/About";
import News from "./component/News";

function App() {
  const [tabs, setTabs] = useState(['Home']);
  const [activeTab, setActiveTab] = useState('Home');
  const [tabContents, setTabContents] = useState({
    Home: <Home />,
  }); // 각 탭에 해당하는 콘텐츠 저장

  // 탭 추가
  const addTab = (menu) => {
    if (!tabs.includes(menu)) {
      setTabs([...tabs, menu]); // 새로운 탭 추가
      setTabContents({
        ...tabContents,
        [menu]: renderTabContent(menu),
      });
    }
    setActiveTab(menu); // 새 탭 활성화
  };

  // 탭 삭제
  const removeTab = (menu) => {
    const updatedTabs = tabs.filter((tab) => tab !== menu);
    setTabs(updatedTabs); // 탭 제거
    // 현재 활성화된 탭이 닫힌 경우, 다른 탭을 활성화
    if (activeTab === menu) {
      setActiveTab(updatedTabs.length > 0 ? updatedTabs[0] : null);
    }
  };


  // 탭에 맞는 컴포넌트를 렌더링하는 함수
  const menuList = ['Home', 'About', 'News'];
  const renderTabContent = (menu) => {
    switch (menu) {
      case "Home":
        return <Home />;
      case "About":
        return <About />;
      case "News":
        return <News />;
      default: 
        return <div>Select a menu</div>;
    }
  };

  return (
    <div className="app">
      {/* 헤더 */}
      <Header />

      {/* 내비게이션 */}
      <Nav />

      {/* 메뉴리스트 */}
      <div className="aside">
        <h3>Menu</h3>
        <ul>
          {menuList.map((menu) => (
            <li key={menu} onClick={() => addTab(menu)}>
              {menu}
            </li>
          ))}
        </ul>
      </div>

      {/* 메인화면 */}
      <div className="article">

        <div className="tabs">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
              >
              <span>{tab}</span>
              {tab !== 'Home' && (
                <button
                  className="close-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // 부모 탭 클릭 이벤트 차단
                    removeTab(tab);
                  }}
                >X</button>
              )}
            </div>
          ))}
        </div>

        <div className="tab-content">
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`tab-pane ${activeTab === tab ? 'visible' : 'hidden'}`}
            >
              {tabContents[tab]}
            </div>
          ))}
        </div>
      </div>

      {/* 푸터 */}
      <Footer />

    </div>
  );
}

export default App;
