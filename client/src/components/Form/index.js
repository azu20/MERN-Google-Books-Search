import React from "react";

// This file exports the Input, TextArea, and FormBtn components

export function Input(props) {
  return (
    <div className="form-group">
      <input className="form-control text-center" {...props} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="form-group ">
      <textarea className="form-control text-center" rows="20" {...props} />
    </div>
  );
}

export function FormBtn(props) {
  return (
    <button {...props} style={{ backgroundColor: "#36384C", float: "center", marginBottom: 10, fontSize: "28px", color: "white"}} className="form-btn">
      {props.children}
    </button>
  );
}
