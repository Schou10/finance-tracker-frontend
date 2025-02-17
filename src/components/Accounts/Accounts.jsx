import { useState, useEffect, useContext } from "react";
import { syncAccounts } from "../../utils/plaidApi";
import AccountCard from "../AccountCard/AccountCard";
import Loader from "../Loader/Loader";
import ExpandableSection from "../Sections/Section-Expandible";
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
    <ExpandableSection
      title="Your Accounts"
      items={accounts}
      renderItem={(account, index) => (
        <AccountCard key={index} account={account} />
      )}
    />
  );
}

export default Accounts;
