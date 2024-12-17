import { useEffect, useContext } from "react";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import CurrentUserContext from "../../context/CurrentUserContext";
import "./PlaidButton.css";

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
      axios
        .post("/exchange_public_token", { public_token: publicToken })
        .then((response) => {
          const accessToken = response.data.access_token;
          axios.post(
            "/accounts",
            { access_token: accessToken },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              },
            }
          );
        });
    }
  }, [publicToken]);

  return (
    <button className="plaid__button" onClick={() => open()} disabled={!ready}>
      Connect Your Bank
    </button>
  );
}

export default PlaidButton;
