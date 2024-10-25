import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon className="userCircle" icon={faCircleUser} />
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Nav;
