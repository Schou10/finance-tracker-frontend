import { useState, useEffect, useContext } from "react";
import TransactionCard from "../TransactionCard/TransactionCard";
import Loader from "../Loader/Loader.jsx";
import { syncTransactions } from "../../utils/plaidApi.js";
import Notification from "../Notification/Notification";
import "./Transactions.css";
import AppContext from "../../context/AppContext.js";

function Transactions() {
  // Check if Transaction is Array to be able to be used for Card maping
  const { setError } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  // const transactionArray = Object.values(transactions);
  const flattenedTransactions =
    transactions?.length > 1 ? transactions : transactions[0];

  useEffect(() => {
    async function fetchData() {
      try {
        const currentTransactions = await syncTransactions();
        setTransactions(currentTransactions);
      } catch (err) {
        setError("Error fetching transaction data:", err);
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
      <section className="transactions section">
        <h2>Recent Transactions</h2>
        <ul className="transactions__list">
          {flattenedTransactions?.map((transaction) => (
            <TransactionCard
              key={transaction.transaction_id}
              transaction={transaction}
            />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Transactions;
