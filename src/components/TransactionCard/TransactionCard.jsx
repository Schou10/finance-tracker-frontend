import "./TransactionCard.css";

function TransactionCard(transaction) {
  const handleCardClick = () => onCardClick(transaction);

  return (
    <li className="card" onClick={handleCardClick}>
      <div className="card__heading">
        <h2 className="card__title">{transaction.name}</h2>
      </div>
      <p>
        Ammount: {transaction.amount > 0 ? "+" : "-"}$
        {Math.abs(transaction.amount)}
      </p>
      <p></p>
    </li>
  );
}

export default TransactionCard;
