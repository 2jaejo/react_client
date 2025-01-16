import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const DivMenu = ({ title, className, menuList, expandedMenu, handleMenuToggle, addTab }) => {

  return (
    <>
      <li
        className={expandedMenu.includes(className) ? 'expanded' : ''}
        onClick={() => handleMenuToggle(className)}
      >
        {title}
        <FontAwesomeIcon
          icon={expandedMenu.includes(className) ? faChevronUp : faChevronDown}
          className="menu-icon"
        />
      </li>
      {expandedMenu.includes(className) && (
        <ul className="submenu">
          {menuList.map((menu) => (
            <li key={menu} onClick={() => addTab(menu)}>
              {menu}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DivMenu;
