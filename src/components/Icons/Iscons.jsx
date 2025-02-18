import "./Icon.css";

function Icon(transaction) {
  return (
    <div className="icon">
      <img
        className="icon__img"
        src={`../../assets/${transaction.type}arrow.svg`}
        alt={`${transaction.type}`}
      />
    </div>
  );
}
