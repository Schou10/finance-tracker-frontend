import SideBar from "../SideBar/SideBar.jsx";
import Accounts from "../Accounts/Accounts.jsx";
import Transactions from "../Transactions/Transactions.jsx";
import Goals from "../Goals/Goals.jsx";
import "./Profile.css";
import { useState, useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import AppContext from "../../context/AppContext.js";

function Profile({ onChangeProfileClick }) {
  const [error, setError] = useState(null);

  return (
    <div className="profile">
      <section className="profile__SideBar">
        <SideBar onChangeProfileClick={onChangeProfileClick} />
      </section>
      <section className="profile__Main">
        <Accounts />
        <Transactions />
        <Goals />
      </section>
    </div>
  );
}

export default Profile;
