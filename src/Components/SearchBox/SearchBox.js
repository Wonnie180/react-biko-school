import React from "react";
import "../../ui/Home/Home.css";

export const SearchBox = ({text, setText, placeholder}) => {
  return (
    
    <div className="inputContainer">
      <input
        placeholder={placeholder}
        className="filterInput"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="clearButton" onClick={() => setText("")}>
        Limpiar búsqueda
      </button>
    </div>
  );
};
