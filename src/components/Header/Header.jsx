import { useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./Header.css";

function Header({ newGoalClick, handleRegisterClick, handleLoginClick }) {
  let { currentUser: user, isLoggedIn } = useContext(CurrentUserContext) || {};
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return (
    <header className="header">
      <Link to={"/"}>
        <img className="header__logo" src={logo} alt="Finance Tracker Logo" />
      </Link>
      <p className="header__date">{currentDate}</p>

      <div className="header__user-container">
        {isLoggedIn ? (
          <button
            className="header__new-goal-btn header__button"
            type="button"
            onClick={newGoalClick}
          >
            + New Goal
          </button>
        ) : null}
        {isLoggedIn ? (
          // Only apply the Link to the username when logged in
          <Link to="/profile" className="header__username">
            <p className="header__username">{user.name}</p>
          </Link>
        ) : null}

        {isLoggedIn ? (
          user.avatar ? (
            <img className="header__avatar" src={user.avatar} alt="avatar" />
          ) : (
            <span className="header__avatar header__avatar_none">
              {user.name?.toUpperCase().charAt(0) || ""}
            </span>
          )
        ) : (
          <div>
            <button
              className="header__register header__button"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
            <button
              className="header__login header__button"
              onClick={handleLoginClick}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
