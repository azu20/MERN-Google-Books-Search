import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 350, clear: "both", paddingTop: 120, textAlign: "center", backgroundColor: "#874E4C"}}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Jumbotron;
