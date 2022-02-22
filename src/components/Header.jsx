import React, {useState, useContext} from "react";
import ThemeContext from "./context/ThemeContext";

const Header = () =>{
  const [darkMode, setDarkMode] = useState(false);
  const color = useContext(ThemeContext);

  return(
    <div className="Header">
      <h1 style={{color}}>ReactHooks</h1>
      <button type="button" onClick={()=> setDarkMode(!darkMode)}>{darkMode ? 'DarkMode' : 'LigthMode'}</button>
    </div>
  );
}

export default Header;