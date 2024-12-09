import SideBar from "../Sidebar/Sidebar.jsx";
import "./Profile.css";

function Profile({ onChangeProfileClick, open, ready }) {
  return (
    <div className="profile">
      <section className="profile__SideBar">
        <SideBar onChangeProfileClick={onChangeProfileClick} />
      </section>
      <section className="link__section">
        <button onClick={() => open()} disabled={!ready}>
          Connect a bank account
        </button>
      </section>
    </div>
  );
}

export default Profile;
