import React from "react";


function Nav() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-danger" style={{fontSize: "28px", margin: "auto"}}>
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
