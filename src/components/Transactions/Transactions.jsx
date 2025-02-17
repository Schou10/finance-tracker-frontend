import { useState, useEffect, useContext } from "react";
import TransactionCard from "../TransactionCard/TransactionCard";
import Loader from "../Loader/Loader.jsx";
import { syncTransactions } from "../../utils/plaidApi.js";
import ExpandableSection from "../Sections/Section-Expandible.jsx";
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
        setError(err.message || "Error fetching transaction data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <ExpandableSection
      title="Recent Transactions"
      items={transactions}
      renderItem={(transaction, index) => (
        <TransactionCard key={index} transaction={transaction} />
      )}
    />
  );
}

export default Transactions;
