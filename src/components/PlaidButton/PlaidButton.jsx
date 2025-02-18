import { useEffect, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./PlaidButton.css";
import { exchange_public_token } from "../../utils/plaidApi";

function PlaidButton() {
  const {
    currentUser: user,
    linkToken,
    publicToken,
    setPublicToken,
  } = useContext(CurrentUserContext) || {};
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token);
    },
    onExit: (err, metadata) => {
      if (err) {
        console.error("Plaid Link Error:", err);
      }
    },
  });

  useEffect(() => {
    if (publicToken) {
      exchange_public_token(publicToken);
    }
  }, [publicToken]);

  return (
    <button className="plaid__button" onClick={() => open()} disabled={!ready}>
      Connect Your Bank
    </button>
  );
}

export default PlaidButton;
