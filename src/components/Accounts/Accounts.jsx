import AccountCard from "../AccountCard/AccountCard";
import "./Accounts.css";

function Accounts({ accounts }) {
  return (
    <section className="accounts">
      <h2 className="accounts__title">User Accounts</h2>
      <ul className="accounts__list">
        {accounts.map((account) => (
          <AccountCard key={account.name} account={account} />
        ))}
      </ul>
    </section>
  );
}

export default Accounts;
