import React from 'react';

const TabContent = ({ tabs, activeTab, tabContents }) => {
  return (
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
  );
};

export default TabContent;
