import { useContext } from "react";
import AppContext from "../../context/AppContext";
import "../Modal/Modal.css";

function TransactionModal({ isOpen, onClose }) {
  const { selectedCard: transaction } = useContext(AppContext);
  if (!isOpen == "preview" || !transaction) return null;
  return transaction ? (
    <div className={`modal ${isOpen == "preview" ? "modal_opened" : null}`}>
      <div className="modal__container">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        <button className="modal__close" onClick={onClose}></button>
        <h2 className="modal__title">Transaction Details</h2>
        <div className="modal__body">
          <p>
            <strong>Name:</strong> {transaction.name || "N/A"}
          </p>
          <p>
            <strong>Amount:</strong> ${transaction.amount || "N/A"}
          </p>
          <p>
            <strong>Date:</strong> {transaction.date || "N/A"}
          </p>
          <p>
            <strong>Authorized Date:</strong>{" "}
            {transaction.authorized_date || "N/A"}
          </p>
          <p>
            <strong>Category:</strong>{" "}
            {transaction.category?.join(", ") || "N/A"}
          </p>
          <p>
            <strong>Payment Channel:</strong>{" "}
            {transaction.payment_channel || "N/A"}
          </p>
          <p>
            <strong>Currency:</strong> {transaction.iso_currency_code || "N/A"}
          </p>
          <p>
            <strong>Merchant:</strong> {transaction.merchant_name || "N/A"}
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
          {transaction.personal_finance_category_icon_url && (
            <img
              src={transaction.personal_finance_category_icon_url}
              alt="Category Icon"
              className="modal__icon"
            />
          )}
        </div>
      </div>
    </div>
  ) : null;
}

export default TransactionModal;
