import { useState, useEffect } from "react";
import TransactionCard from "../TransactionCard/TransactionCard";
import AppContext from "../../context/AppContext.js";
import Loader from "../Loader/Loader.jsx";
import {
  fetchTransactionData,
  syncTransactions,
} from "../../utils/plaidApi.js";
import "./Transactions.css";

function Transactions() {
  // Check if Transaction is Array to be able to be used for Card maping
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  // const transactionArray = Object.values(transactions);
  const flattenedTransactions =
    transactions.length > 1 ? transactions : transactions[0];

  useEffect(() => {
    async function fetchData() {
      try {
        const currentTransactions = await syncTransactions();
        setTransactions(currentTransactions);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
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
  );
}

export default Transactions;
