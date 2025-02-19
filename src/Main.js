import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from 'react-router-dom'; // v6: Routes와 Route 사용

// 로고
// import logo from "./logo.svg";

// 레이아웃
import Header from "./layout/Header";
import Navi from "./layout/Navi";
// import Aside from "./layout/Aside";
// import Article from "./layout/Article";
import Footer from "./layout/Footer";

// 컴포넌트
import DivMenu from "./components/DivMenu";
import TabList from "./components/TabList";
import TabContent from "./components/TabContent";
import Sidebar from "./components/Sidebar";

// 페이지
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Set from "./pages/Set";
import Help from "./pages/Help";
import Logs from "./pages/Logs";
import Menu31 from "./pages/Menu3_1";
import Menu32 from "./pages/Menu3_2";
import Menu33 from "./pages/Menu3_3";
import Menu34 from "./pages/Menu3_4";
import Menu41 from "./pages/Menu4_1";
import Menu42 from "./pages/Menu4_2";
import Menu43 from "./pages/Menu4_3";
import Menu44 from "./pages/Menu4_4";
import Menu51 from "./pages/Menu5_1";
import Menu52 from "./pages/Menu5_2";


// 유틸
import { setupAxiosInterceptor } from "./utils/Axios";
import { GlobalContext } from "./utils/GlobalContext";

function Main() {
  const navigate = useNavigate();
  // 인터셉터 설정
  React.useEffect(() => {
    setupAxiosInterceptor(navigate);
  }, [navigate]);

  const isOpen = useRef(false);
  // const [openState, setOpenState] = useState(isOpen.current);
  // 사이드바 토글
  const toggleSidebar = () => {
    console.log("toggleSidebar");
    isOpen.current = !isOpen.current;
  };


  const { isTab, toggleTab } = useContext(GlobalContext);
  const [key, setKey] = useState("Home"); // key 상태 초기값은 null

  // 확장된 메뉴를 추적하는 상태
  const [expandedMenu, setExpandedMenu] = useState(["menu1"]);
  // 탭 리스트
  const [tabs, setTabs] = useState(["Home"]);
  // 탭 활성화
  const [activeTab, setActiveTab] = useState("Home");
  // 탭 내용 - Home 기본값
  const [tabContents, setTabContents] = useState({ Home: <Home /> });

  // 메뉴 항목 확장/축소 토글 함수
  const handleMenuToggle = (menu) => {
    setExpandedMenu(
      expandedMenu.includes(menu)
        ? expandedMenu.filter((item) => item !== menu)
        : [...expandedMenu, menu]
    );
  };

  // 탭 추가
  const addTab = (menu) => {
    if(!isTab){
      setKey(menu);
      return;
    }

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
      case "Menu3_1":
        return <Menu31 />;
      case "Menu3_2":
        return <Menu32 />;
      case "Menu3_3":
        return <Menu33 />;
      case "Menu3_4":
        return <Menu34 />;
      case "Menu4_1":
        return <Menu41 />;
      case "Menu4_2":
        return <Menu42 />;
      case "Menu4_3":
        return <Menu43 />;
      case "Menu4_4":
        return <Menu44 />;
      case "Menu5_1":
        return <Menu51 />;
      case "Menu5_2":
        return <Menu52 />;
      default:
        return <div>Select a menu</div>;
    }
  };

  let openPage = getTabContent(key);

  // 메뉴 분류
  const menuList = ["Home", "About", "News"];
  const menuList2 = ["Set", "Help", "Logs"];
  const menuList3 = ["Menu3_1", "Menu3_2", "Menu3_3", "Menu3_4"];
  const menuList4 = ["Menu4_1", "Menu4_2", "Menu4_3", "Menu4_4"];
  const menuList5 = ["Menu5_1", "Menu5_2"];

  
  const sidebar_content = () => {
    return (
      <div>
        <ul>
          {/* expended Menu */}
          <DivMenu
            title={"Menu1"}
            className={"menu1"}
            menuList={menuList}
            expandedMenu={expandedMenu}
            handleMenuToggle={handleMenuToggle}
            addTab={addTab}
          />
          {/* expended Menu */}
          <DivMenu
            title={"Menu2"}
            className={"menu2"}
            menuList={menuList2}
            expandedMenu={expandedMenu}
            handleMenuToggle={handleMenuToggle}
            addTab={addTab}
          />
          {/* expended Menu */}
          <DivMenu
            title={"Menu3"}
            className={"menu3"}
            menuList={menuList3}
            expandedMenu={expandedMenu}
            handleMenuToggle={handleMenuToggle}
            addTab={addTab}
          />
          {/* expended Menu */}
          <DivMenu
            title={"Menu4"}
            className={"menu4"}
            menuList={menuList4}
            expandedMenu={expandedMenu}
            handleMenuToggle={handleMenuToggle}
            addTab={addTab}
          />
          {/* expended Menu */}
          <DivMenu
            title={"Menu5"}
            className={"menu5"}
            menuList={menuList5}
            expandedMenu={expandedMenu}
            handleMenuToggle={handleMenuToggle}
            addTab={addTab}
          />
        </ul>
      </div>
    );
  };


  return (
    <div className="main">
      {/* 헤더 */}
      <Header />

      {/* 내비게이션 */}
      <Navi />

      {/* 메뉴리스트 */}
      <Sidebar content={sidebar_content()}/>

      {/* 메인화면 */}
      <div className="article">
        { isTab ?
          <div>
            <TabList
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              removeTab={removeTab}
            />
            <TabContent
              tabs={tabs}
              activeTab={activeTab}
              tabContents={tabContents}
            />
          </div>
        : 
          <div style={{backgroundColor: "white", padding: "20px"}}>
            {openPage}
          </div> 
        }
      </div>

      {/* 푸터 */}
      <Footer />
    </div>
  );
}

export default Main;
