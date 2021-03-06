import React from "react";
import "./style.css";

// This file exports both the List and ListItem components

export function List({ children }) {
  return (
    <div className="list-overflow">
      <ul className="list-group"  style={{ backgroundColor: "#F7DFD4" }}>{children}</ul>
    </div>
  );
}

export function ListItem({ children }) {
  return <li className="list-group-item" style={{ margin: "auto", flexWrap: "wrap", width: "58rem",  backgroundColor: "#32485C" }}>{children}</li>;
}
