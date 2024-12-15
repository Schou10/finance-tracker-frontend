import { useEffect, useContext } from "react";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import CurrentUserContext from "../../context/CurrentUserContext";
import { baseUrl } from "../../utils/constants";
import "./PlaidButton.css";

axios.defaults.baseURL = baseUrl;

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

  useEffect(() => {});

  return (
    <button className="plaid__button" onClick={() => open()} disabled={!ready}>
      Connect Your Bank
    </button>
  );
}

export default PlaidButton;
