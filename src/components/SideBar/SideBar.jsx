import { useContext } from "react";
import { removeToken } from "../../utils/token";
import { useNavigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onChangeProfileClick }) {
  let { currentUser: user } = useContext(CurrentUserContext) || {};
  const { setIsLoggedIn, setUserData } = useContext(AppContext);

  const navigate = useNavigate();

  function signOut() {
    removeToken();
    navigate("/");
    setUserData({});
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
    </section>
  );
}

export default SideBar;
