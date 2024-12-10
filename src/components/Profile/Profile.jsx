import SideBar from "../Sidebar/Sidebar.jsx";
import Balance from "../Balance/Balance.jsx";
import Transactions from "../Transactions/Transactions.jsx";
import Goals from "../Goals/Goals.jsx";
import "./Profile.css";

function Profile({ onChangeProfileClick }) {
  return (
    <div className="profile">
      <section className="profile__SideBar">
        <SideBar onChangeProfileClick={onChangeProfileClick} />
      </section>
      <section className="profile__Main">
        <Balance />
        <Transactions />
        <Goals />
      </section>
    </div>
  );
}

export default Profile;
