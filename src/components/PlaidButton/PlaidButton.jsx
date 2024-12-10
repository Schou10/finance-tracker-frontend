import { useEffect, useContext } from "react";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { baseUrl } from "../../utils/constants";
import "./PlaidButton.css";

axios.defaults.baseURL = baseUrl;

function PlaidButton() {
  let { linkToken, publicToken, setPublicToken } =
    useContext(CurrentUserContext) || {};
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token);
      setTimeout(
        () => console.log("Public Token set (delayed):", publicToken),
        1
      );
    },
    onExit: (err, metadata) => {
      if (err) {
        console.error("Plaid Link Error:", err);
      }
    },
  });

  useEffect(() => {
    console.log("useEffect triggered with publicToken:", publicToken);
    if (publicToken) {
      async function fetchPlaidToken() {
        console.log("Fetching Plaid Token");
        let accessToken = await axios.post("/exchange_public_token", {
          public_token: publicToken,
        });
        setAccessToken(accessToken.data.access_token);
        console.log("Access Token:", accessToken.data);
      }
      fetchPlaidToken();
    }
  }, [publicToken]);

  return (
    <button className="plaid__button" onClick={() => open()} disabled={!ready}>
      Connect Your Bank
    </button>
  );
}

export default PlaidButton;
