import { useEffect, useContext } from "react";
import axios from "axios";
import { usePlaidLink } from "react-plaid-link";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { baseUrl } from "../../utils/constants";
import "./PlaidButton.css";

axios.defaults.baseURL = baseUrl;

function PlaidButton() {
  const {
    linkToken,
    publicToken,
    setPublicToken,
    accessToken,
    setAccessToken,
  } = useContext(CurrentUserContext) || {};
  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token);
      console.log("Public Token", publicToken);
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
      console.log(
        "Preparing to exchange accesss token with publicToken:",
        publicToken
      );
      async function fetchData() {
        try {
          const accessTokenRes = await axios.post("/exchange_public_token", {
            public_token: publicToken,
          });
          console.log(
            "Recieved access_token:",
            accessTokenRes.data.access_token
          );
          setAccessToken(accessTokenRes.data.access_token);
          console.log(
            "Retrieving Auth with access_token:",
            accessTokenRes.data.access_token
          );
          const authRes = await axios.post("/auth", {
            access_token: accessTokenRes.data.access_token,
            headers: { "Content-Type": "application/json" },
          });
          console.log("Auth Date:", authRes.data);
        } catch (err) {
          console.error("Error in fetching Plaid data:", err);
        }
      }
      fetchData();
    }
  }, [publicToken]);

  return (
    <button className="plaid__button" onClick={() => open()} disabled={!ready}>
      Connect Your Bank
    </button>
  );
}

export default PlaidButton;
