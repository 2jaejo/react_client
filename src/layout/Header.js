import React, { useContext } from 'react'
import { ThemeContext } from "../utils/ThemeContext";

export default function Header() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className='header'>
      <span>Header 현재 theme: {theme} </span>
      <button className="btn btn-secondary" onClick={toggleTheme}>테마 변경</button>
    </div>
  )
}
