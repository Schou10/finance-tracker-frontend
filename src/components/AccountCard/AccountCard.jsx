import "./AccountCard.css";
import { getAccountIcon } from "../../utils/getAccountIcon";

function AccountCard({ account }) {
  return (
    <div className="account__card">
      <div className="account__header">
        <img
          className="account__icon"
          src={getAccountIcon(account.subtype)}
          alt={account.subtype}
        />
        <h3 className="account__name">{account.name}</h3>
      </div>
      <p
        className={`account__balance ${
          account.balances.current < 0 ? "negative" : ""
        }`}
      >
        ${account.balances.available}
      </p>
      <p className="account__type">{account.subtype}</p>
    </div>
  );
}

export default AccountCard;
