import { useContext } from "react";
import AppContext from "../../context/AppContext";
import "./TransactionModal.css";

function TransactionModal({ isOpen, onClose }) {
  const { selectedCard: transaction } = useContext(AppContext);
  if (!isOpen == "preview" || !transaction) return null;
  return transaction ? (
    <div className={`modal ${isOpen == "preview" ? "modal_opened" : null}`}>
      <div className="modal__container">
        <button className="modal__close" onClick={onClose}></button>
        <div className="modal__heading">
          <h2 className="modal__title">{transaction.name}:</h2>
          <p className="transaction-modal__merchant">
            {" "}
            {transaction.merchant_name || "N/A"}
          </p>
        </div>
        <div className="modal__body">
          <p>{transaction.date || "N/A"}</p>
          <h3>Amount:</h3>
          <p className="transaction-modal__amount">
            {" "}
            ${transaction.amount || "N/A"}
          </p>

          <p>
            <strong>Authorized Date:</strong>{" "}
            {transaction.authorized_date || "N/A"}
          </p>
          <h3>Category:</h3>
          <p>{transaction.category?.join(", ") || "N/A"}</p>
          <p>
            <strong>Payment Channel:</strong>{" "}
            {transaction.payment_channel || "N/A"}
          </p>
          <p>
            <strong>Currency:</strong> {transaction.iso_currency_code || "N/A"}
          </p>

          <p>
            <strong>Transaction Type:</strong>{" "}
            {transaction.transaction_type || "N/A"}
          </p>
          {transaction.location?.city && (
            <p>
              <strong>Location:</strong> {transaction.location.city}
            </p>
          )}
          {transaction.personal_finance_category?.primary && (
            <p>
              <strong>Category:</strong>{" "}
              {transaction.personal_finance_category.primary}
            </p>
          )}
        </div>
        <img
          src={transaction.personal_finance_category_icon_url}
          alt="Category Icon"
          className="modal__icon"
        />
      </div>
    </div>
  ) : null;
}

export default TransactionModal;
