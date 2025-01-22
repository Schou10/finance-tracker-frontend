import { useState, useEffect, useContext } from "react";
import { fetchAccountData, syncAccounts } from "../../utils/plaidApi";
import CurrentUserContext from "../../context/CurrentUserContext";
import AccountCard from "../AccountCard/AccountCard";
import Loader from "../Loader/Loader";
import "./Accounts.css";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        const currentAccounts = await syncAccounts();
        setAccounts(currentAccounts.accounts);
      } catch (error) {
        console.error("Error fetching account data:", error);
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
