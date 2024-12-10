import React, { useEffect, useState } from "react";
import TransactionCard from "../TransactionCard/TransactionCard";
import "./Transactions.css";

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("/transactions")
      .then((res) => res.json())
      .then(setTransactions)
      .catch(console.error);
  }, []);

  return (
    <section className="transactions">
      <h2>Recent Transactions</h2>
      <ul className="transactions__list">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.transaction_id} />
        ))}
      </ul>
    </section>
  );
}

export default Transactions;
