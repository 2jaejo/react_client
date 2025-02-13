import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isTab, setIsTab] = useState(localStorage.getItem("isTab") || true);
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem("isTab", isTab);
  }, [isTab]);

  const toggleTheme = () => {
    console.log("toggleTheme");
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  
  const toggleTab = () => {
    console.log("toggleTab");
    setIsTab((prev) => (prev === true ? false : true));
  };


  return (
    <GlobalContext.Provider value={{ theme, toggleTheme, isTab, toggleTab }}>
      {children}
    </GlobalContext.Provider>
  );
};
