import React, { useState, useEffect } from "react";
import { getAccountBalances, getBudgetOverview } from "../../utils/budgetApi";
import Loader from "../Loader/Loader";

function BudgetOverview() {
  const [balances, setBalances] = useState([]);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const accounts = await getAccountBalances();
        setBalances(accounts);

        const budget = await getBudgetOverview();
        setOverview(budget);
      } catch (error) {
        console.error("Error fetching budget data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="budget-overview section">
      <h1 className="budget-overview__title">Budget Overview</h1>
      <div className="budget-overiew__account-balances">
        <h2 className="budget-overview__section-title">Account Balances</h2>
        <ul>
          {balances.map((account) => (
            <li key={account.account_id}>
              {account.name}: ${account.balances.current.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
      <div className="budget-overview__spending-summary">
        <h2 className="budget-overview__section-title">Spending Summary</h2>
        {overview && (
          <ul className="spending-summary__list">
            {Object.entries(overview.spendingByCategory).map(
              ([category, amount]) => (
                <li key={category} className="spending-summary__list-item">
                  {category}: ${amount.toFixed(2)}
                </li>
              )
            )}
          </ul>
        )}
      </div>
      <div className="budget-overview__footer">
        <h2 className="budget-overview__section-title">Net Cash Flow</h2>
        <p>${overview?.netCashFlow.toFixed(2)}</p>
      </div>
    </section>
  );
}

export default BudgetOverview;
