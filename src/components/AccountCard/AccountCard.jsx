import { useContext } from "react";
import { getAccountIcon } from "../../utils/getIcons";
import AppContext from "../../context/AppContext";

function AccountCard({ account }) {
  const { addComma } = useContext(AppContext);
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
      <div className="account__info">
        <p
          className={`account__balance ${
            account.balances.current < 0 ? "negative" : ""
          }`}
        >
          ${addComma(account.balances.available)}
        </p>
        <p className="account__type">{account.subtype}</p>
      </div>
    </div>
  );
}

export default AccountCard;
