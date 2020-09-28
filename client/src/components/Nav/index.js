import React from "react";


function Nav() {
  return (
    <nav className="navbar navbar-expand-md " style={{fontSize: "28px", margin: "auto", backgroundColor: "#EABCAC"}}>
      <a className="navbar-brand" href="/">
        Homepage
      </a>
      <a className="navbar-brand" href="/mylist" >
        My Reading List
      </a>
    </nav>
  );
}

export default Nav;
