import SideBar from "../Sidebar/Sidebar.jsx";
import Accounts from "../Accounts/Accounts.jsx";
import Transactions from "../Transactions/Transactions.jsx";
import Goals from "../Goals/Goals.jsx";
import "./Profile.css";
import { useEffect, useState, useContext } from "react";
import {
  saveAccountData,
  saveTransactionData,
  syncAccounts,
  syncTransactions,
} from "../../utils/plaidApi.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import AppContext from "../../contexts/AppContext.js";

function Profile({ onChangeProfileClick }) {
  const { publicToken } = useContext(CurrentUserContext) || {};
  const [error, setError] = useState(null);
  const { setIsLoading, accounts, setAccounts, transactions, setTransactions } =
    useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const accountsData = await syncAccounts();
        console.log("Accounts:", accountsData.accounts);
        console.log("accountData Item:", accountsData.item.item_id);
        setAccounts(accountsData.accounts);
        await saveAccountData({
          accounts: accountsData.accounts,
          item_id: accountsData.item.item_id,
        });
        const transactionData = await syncTransactions();
        setTransactions(transactionData);
        await saveTransactionData(transactionData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (publicToken) {
      fetchData();
    }
  }, [publicToken]);

  return (
    <div className="profile">
      <section className="profile__SideBar">
        <SideBar onChangeProfileClick={onChangeProfileClick} />
      </section>
      <section className="profile__Main">
        <Accounts accounts={accounts} />
        <Transactions transactions={transactions} />
        <Goals />
      </section>
    </div>
  );
}

export default Profile;
