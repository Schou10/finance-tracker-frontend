import SideBar from "../SideBar/SideBar.jsx";
import Accounts from "../Accounts/Accounts.jsx";
import Transactions from "../Transactions/Transactions.jsx";
import Goals from "../Goals/Goals.jsx";
import "./Profile.css";
import { useContext, useState } from "react";
import CurrentUserContext from "../../context/CurrentUserContext.js";

function Profile({ onChangeProfileClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [error, setError] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="profile">
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarVisible(!isSidebarVisible)}
      >
        ☰
      </button>
      <section className={`profile__SideBar ${isSidebarVisible ? "show" : ""}`}>
        <SideBar onChangeProfileClick={onChangeProfileClick} />
      </section>
      <section className="profile__Main">
        <h1 className="profile__Main-title">
          Welcome back <span>{currentUser.name}!</span>
        </h1>
        <Accounts />
        <Transactions />
        <Goals />
      </section>
    </div>
  );
}

export default Profile;
