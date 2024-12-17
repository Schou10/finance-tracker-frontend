import { useContext } from "react";
import TransactionCard from "../TransactionCard/TransactionCard";
import AppContext from "../../context/AppContext.js";
import "./Transactions.css";

function Transactions() {
  // Check if Transaction is Array to be able to be used for Card maping
  const { transactions } = useContext(AppContext);
  const transactionArray = Object.values(transactions);
  const flattenedTransactions =
    !Array.isArray(transactions) && transactionArray.length === 1
      ? transactionArray[0]
      : transactions;
  return (
    <section className="transactions section">
      <h2>Recent Transactions</h2>
      <ul className="transactions__list">
        {transactions
          ? flattenedTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.transaction_id}
                transaction={transaction}
              />
            ))
          : null}
      </ul>
    </section>
  );
}

export default Transactions;
