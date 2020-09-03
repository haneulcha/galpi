import React, { useState } from "react";
import { Link } from "react-router-dom";

const Dropdown = (params) => {};

const NavBar = () => {
  //   const [loggedIn, setLoggedIn] = useState(false);

  return (
    <header>
      <Link to="/" className="header">
        마디갈피
      </Link>
      <span role="img" aria-label="post">
        📝
      </span>
      <span role="img" aria-label="profile">
        🏷️
      </span>
    </header>
  );
};

export default NavBar;
