import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="navLogo">
        <img
          className="logoImg"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link to="/signin" className="navLink">
          <i className="fa fa-user-circle"></i>
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
