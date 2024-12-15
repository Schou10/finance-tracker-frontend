import { useContext } from "react";
import { removeToken } from "../../utils/token.js";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext.js";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import PlaidButton from "../PlaidButton/PlaidButton";
import "./SideBar.css";

function SideBar({ onChangeProfileClick }) {
  let { currentUser: user, linkToken } = useContext(CurrentUserContext) || {};
  const { setIsLoggedIn, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  function signOut() {
    removeToken();
    navigate("/");
    setUser({});
    setIsLoggedIn(false);
  }

  return (
    <section className="sidebar">
      <div className="sidebar__section">
        {user.avatar ? (
          <img className="sidebar__avatar" src={user.avatar} alt="avatar" />
        ) : (
          <span className="sidebar__avatar sidebar__avatar_none">
            {user.name?.toUpperCase().charAt(0) || ""}
          </span>
        )}
        <p className="sidebar__username">{user.name}</p>
      </div>
      <p className="sidebar__button" onClick={onChangeProfileClick}>
        Change Profile Data
      </p>
      <p className="sidebar__button" onClick={signOut}>
        Log Out
      </p>
      {linkToken ? (
        <PlaidButton />
      ) : (
        <p className="sidebar__button">Loading...</p>
      )}
    </section>
  );
}

export default SideBar;
