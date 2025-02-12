import React, { useState, useContext } from "react";
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

// 페이지
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Set from "./pages/Set";
import Help from "./pages/Help";
import Logs from "./pages/Logs";

// 유틸
import { setupAxiosInterceptor } from "./utils/Axios";
import { GlobalContext } from "./utils/GlobalContext";

function Main() {
  const navigate = useNavigate();
  // 인터셉터 설정
  React.useEffect(() => {
    setupAxiosInterceptor(navigate);
  }, [navigate]);

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

  // 로그아웃
  // const logout = async () => {
  //   try {
  //     await fetch("/api/auth/logout", {
  //       method: "POST",
  //       credentials: "include", // 쿠키 포함
  //     });

  //     // 클라이언트 상태 초기화
  //     localStorage.removeItem("accessToken");
  //     alert("Logged out successfully!");
  //   } catch (error) {
  //     console.error("Error logging out:", error);
  //   }
  // };



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
      default:
        return <div>Select a menu</div>;
    }
  };

  let openPage = getTabContent(key);

  // 메뉴 분류
  const menuList = ["Home", "About", "News"];
  const menuList2 = ["Set", "Help", "Logs"];

  return (
    <div className="main">
      {/* 헤더 */}
      <Header />

      {/* 내비게이션 */}
      <Navi />

      {/* 메뉴리스트 */}
      <div className="aside">
        <span>aside 현재 tab: {String(isTab)} </span>
        <button className="btn btn-secondary" onClick={toggleTab}>탭기능 활성화</button>

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
        </ul>
      </div>

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
