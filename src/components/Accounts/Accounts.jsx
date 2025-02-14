import { useState, useEffect, useContext } from "react";
import { syncAccounts } from "../../utils/plaidApi";
import AccountCard from "../AccountCard/AccountCard";
import Loader from "../Loader/Loader";
import Notification from "../Notification/Notification";
import AppContext from "../../context/AppContext";
import "./Accounts.css";

function Accounts() {
  const { setError } = useContext(AppContext);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const currentAccounts = await syncAccounts();
        setAccounts(currentAccounts);
      } catch (err) {
        setError(err.message || "Error fetching account data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="accounts section">
      <h2 className="accounts__title">User Accounts</h2>
      <ul className="accounts__list">
        {accounts?.map((account) => (
          <AccountCard key={account.name} account={account} />
        ))}
      </ul>
    </section>
  );
}

export default Accounts;
