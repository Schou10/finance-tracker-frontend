import { useState, useEffect, useContext } from "react";
import { syncAccounts } from "../../utils/plaidApi";
import AccountCard from "../AccountCard/AccountCard";
import Loader from "../Loader/Loader";
import Notification from "../Notification/Notification";
import "./Accounts.css";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const currentAccounts = await syncAccounts();
        setAccounts(currentAccounts);
      } catch (err) {
        setError("Error fetching account data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      {error && <Notification message={error} onClose={() => setError(null)} />}
      <section className="accounts section">
        <h2 className="accounts__title">User Accounts</h2>
        <ul className="accounts__list">
          {accounts?.map((account) => (
            <AccountCard key={account.name} account={account} />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Accounts;
