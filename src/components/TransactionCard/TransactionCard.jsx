import { useContext } from "react";
import AppContext from "../../context/AppContext";
import increase from "../../assets/IncreaseArrow.svg";
import decrease from "../../assets/DecreaseArrow.svg";
import "./TransactionCard.css";

function TransactionCard({ transaction }) {
  const { handleCardClick } = useContext(AppContext);
  const onCardClick = () => handleCardClick(transaction);

  return (
    <li
      className={`card ${
        transaction.amount > 0 ? "card-increase" : "card-decrease"
      }`}
      onClick={onCardClick}
    >
      <div className="card__heading">
        <h2 className="card__title">{transaction.name}</h2>
      </div>
      <div className="card__content">
        <p className="card__date">Date: {transaction.date}</p>
        <p className="card__amount">
          Amount: {transaction.amount > 0 ? "+" : "-"}
          <span>${Math.abs(transaction.amount)}</span>
        </p>
      </div>
      <div
        className={`card__image-background ${
          transaction.amount > 0 ? " image-increase" : " image-decrease"
        }`}
      >
        <img
          className="card__image"
          src={transaction.amount > 0 ? increase : decrease}
          alt="Increase/decreas arrow"
        />
      </div>
    </li>
  );
}

export default TransactionCard;
