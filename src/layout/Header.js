import React, { useContext } from 'react'
import { GlobalContext } from "../utils/GlobalContext";

export default function Header() {

  const { theme, toggleTheme } = useContext(GlobalContext);

  return (
    <div className='header'>
      <span>Header 현재 theme: {theme} </span>
      <button className="btn btn-secondary" onClick={toggleTheme}>테마 변경</button>
    </div>
  )
}
