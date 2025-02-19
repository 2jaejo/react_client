import React from 'react';

const TabContent = ({ tabs, activeTab, tabContents }) => {
  return (
    <div className="tab-content">
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`tab-pane ${activeTab === tab ? 'visible' : 'hidden'}`}
          style={{padding:"0 0.5rem"}}
        >
          {tabContents[tab]}
        </div>
      ))}
    </div>
  );
};

export default TabContent;
