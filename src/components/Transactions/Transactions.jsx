import TransactionCard from "../TransactionCard/TransactionCard";
import "./Transactions.css";

function Transactions({ transactions }) {
  // Check if Transaction is Array to be able to be used for Card maping
  const transactionArray = Object.values(transactions);
  const flattenedTransactions =
    !Array.isArray(transactions) && transactionArray.length === 1
      ? transactionArray[0]
      : transactions;
  return (
    <section className="transactions">
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
