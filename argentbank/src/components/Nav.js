import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  logout,
  selectCurrentUser,
  selectIsAuthenticated,
} from "../features/auth/authSlice";

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectCurrentUser);

  console.log("État d'authentification:", isAuthenticated);
  console.log("Données utilisateur:", user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
      <div className="navLinkWrapper">
        {isAuthenticated && user ? (
          <>
            <div className="logWrapper">
              <FontAwesomeIcon className="userCircle" icon={faCircleUser} />
              <Link to="/user" className="navLink">
                {user?.firstName}
              </Link>
            </div>
            <div className="logWrapper">
              <FontAwesomeIcon icon={faRightFromBracket} />
              <button onClick={handleLogout} className="navLink">
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <div className="logWrapper">
            <FontAwesomeIcon className="userCircle" icon={faCircleUser} />
            <Link to="/signin" className="navLink">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
