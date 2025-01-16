import React, { useState } from "react";

// 로고
// import logo from "./logo.svg";

// 레이아웃
import Header from "./layout/Header";
import Nav from "./layout/Nav";
// import Aside from "./layout/Aside";
// import Article from "./layout/Article";
import Footer from "./layout/Footer";

// 메뉴 분류
import DivMenu from "./components/DivMenu";
import TabList from "./components/TabList";
import TabContent from "./components/TabContent";

// 페이지
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Set from "./pages/Set";
import Help from "./pages/Help";
import Logs from "./pages/Logs";

function App() {
  // 확장된 메뉴를 추적하는 상태
  const [expandedMenu, setExpandedMenu] = useState([]); 
  // 탭 리스트
  const [tabs, setTabs] = useState(['Home']);
  // 탭 활성화
  const [activeTab, setActiveTab] = useState('Home');
  // 탭 내용 - Home 기본값
  const [tabContents, setTabContents] = useState({ Home: <Home />,}); 

  
  // 메뉴 항목 확장/축소 토글 함수
  const handleMenuToggle = (menu) => {
    setExpandedMenu( expandedMenu.includes(menu) ? expandedMenu.filter((item) => item !== menu) : [...expandedMenu, menu] );
  };


  // 탭 추가
  const addTab = (menu) => {
    if (!tabs.includes(menu)) {
      setTabs([...tabs, menu]); // 새로운 탭 추가
      setTabContents({
        ...tabContents,
        [menu]: getTabContent(menu),
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
  const menuList2 = ['Set', 'Help', 'Logs'];
  const getTabContent = (menu) => {
    switch (menu) {
      case "Home":
        return <Home />;
      case "About":
        return <About />;
      case "News":
        return <News />;
      case "Set":
        return <Set />;
      case "Help":
        return <Help />;
      case "Logs":
        return <Logs />;
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
        <ul>
          {/* expended Main Menu */}
          <DivMenu
            title={'Main Menu1'}
            className={"main"}
            menuList={menuList}
            expandedMenu={expandedMenu}
            handleMenuToggle={handleMenuToggle}
            addTab={addTab}
          />
          {/* expended Main Menu */}
          <DivMenu
            title={'Main Menu2'}
            className={"main2"}
            menuList={menuList2}
            expandedMenu={expandedMenu}
            handleMenuToggle={handleMenuToggle}
            addTab={addTab}
          />
        </ul>
      </div>


      {/* 메인화면 */}
      <div className="article">
        {/* 탭 리스트 */}
        <TabList
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          removeTab={removeTab}
        />

        {/* 탭 내용 */}
        <TabContent 
          tabs={tabs} 
          activeTab={activeTab} 
          tabContents={tabContents} 
        />
      </div>


      {/* 푸터 */}
      <Footer />

    </div>
  );
}

export default App;
