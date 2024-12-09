import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import RecentTransactions from "../RecentTransactions/RecentTransactions";
import BudgetOverview from "../BudgetOverview/BudgetOverview";
import Charts from "../Charts/Charts";

const DashboardOverview = () => {
  let { currentUser: user } = useContext(CurrentUserContext) || {};

  return (
    <section className="dashboard-overview">
      <h1>Welcome back, {user.name}</h1>
      <BudgetOverview />
      <RecentTransactions />
      <Charts />
    </section>
  );
};

export default DashboardOverview;
