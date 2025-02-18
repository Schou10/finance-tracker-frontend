import { useContext } from "react";
import AppContext from "../../context/AppContext";
import "./TransactionModal.css";

function TransactionModal({ isOpen, onClose }) {
  const { selectedCard: transaction } = useContext(AppContext);
  if (!isOpen == "preview" || !transaction) return null;
  return transaction ? (
    <div className={`modal ${isOpen == "preview" ? "modal_opened" : null}`}>
      <div
        className={`modal__container ${
          transaction.amount > 0 ? "modal__income" : "modal__expense"
        }`}
      >
        <button className="modal__close" onClick={onClose}></button>
        <div className="modal__heading">
          <h2 className="transaction__title">{transaction.name}: </h2>
          <p className="transaction__date">{transaction.date}</p>
        </div>
        <div className="modal__body">
          <p className="transaction__amount">
            Amount: {transaction.amount + " " + transaction.iso_currency_code}
          </p>
          <p className="transaction__category">
            Category: {transaction.category?.join(", ") || "None"}
          </p>
          <p className="transaction__auth-date">
            Authorized Date: {transaction.authorized_date}
          </p>
        </div>
        {transaction.personal_finance_category_icon_url ? (
          <img
            src={transaction.personal_finance_category_icon_url}
            alt="Category Icon"
            className="modal__icon"
          />
        ) : null}
      </div>
    </div>
  ) : null;
}

export default TransactionModal;
