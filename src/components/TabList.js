import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const TabList = ({ tabs, activeTab, setActiveTab, removeTab }) => {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`tab ${activeTab === tab ? 'active' : ''}`}
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
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabList;
