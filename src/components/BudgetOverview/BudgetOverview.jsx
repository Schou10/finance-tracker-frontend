import React, { useState, useEffect, useContext } from "react";
import { syncAccounts } from "../../utils/plaidApi";
import { getBudgetOverview } from "../../utils/plaidApi";
import Loader from "../Loader/Loader";
import AppContext from "../../context/AppContext";
import "../Sections/Sections.css";

function BudgetOverview() {
  const [balances, setBalances] = useState([]);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setError } = useContext(AppContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const accounts = await syncAccounts();
        setBalances(accounts);

        const budget = await getBudgetOverview();
        setOverview(budget);
      } catch (err) {
        setError(err || "Error fetching budget data:");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="budget-overview section">
      <h2 className="budget-overview__title">Budget Overview</h2>

      {/* Account Balances */}
      <div className="budget-overview__account-balances">
        <h3 className="budget-overview__section-title">Account Balances</h3>
        <ul>
          {balances?.length > 0 ? (
            balances.map((account) => (
              <li key={account.account_id}>
                {account.name}: ${account.balances.current.toFixed(2)}
              </li>
            ))
          ) : (
            <p>No account data available</p>
          )}
        </ul>
      </div>

      {/* Spending Summary */}
      <div className="budget-overview__spending-summary">
        <h3 className="budget-overview__section-title">Spending Summary</h3>
        {overview?.spendingByCategory ? (
          <ul className="spending-summary__list">
            {Object.entries(overview.spendingByCategory).map(
              ([category, amount]) => (
                <li key={category} className="spending-summary__list-item">
                  {category}: ${amount.toFixed(2)}
                </li>
              )
            )}
          </ul>
        ) : (
          <p>No spending data available</p>
        )}
      </div>

      {/* Net Cash Flow */}
      <div className="budget-overview__footer">
        <h3 className="budget-overview__section-title">Net Cash Flow</h3>
        <p>${overview?.netCashFlow?.toFixed(2) ?? "0.00"}</p>
      </div>
    </section>
  );
}

export default BudgetOverview;
