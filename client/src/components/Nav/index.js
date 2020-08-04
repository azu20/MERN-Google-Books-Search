import React from "react";
import MyList from "../../pages/MyList";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
