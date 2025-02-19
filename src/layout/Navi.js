import React, { useContext } from "react";
import { GlobalContext } from "../utils/GlobalContext";

export default function Navi() {
  const { sidebar, toggleSidebar } = useContext(GlobalContext);
  
  return (
    <div className='navi d-flex justify-content-between align-items-center'>
      Navi
      {/* 768px 이하에서만 보이는 버튼 */}
      {!sidebar.isDesktop && (
        <button onClick={toggleSidebar} className="btn btn-sm btn-primary">{sidebar.isOpen ? "메뉴 닫기" : "메뉴 열기"}</button>
      )}
    </div>
  )
}
