import React, { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Transactions from "../Transactions/Transactions";
import BudgetOverview from "../BudgetOverview/BudgetOverview";
import Goals from "../Goals/Goals";

const DashboardOverview = () => {
  let { currentUser: user } = useContext(CurrentUserContext) || {};

  return (
    <section className="dashboard-overview">
      <h2 className="dashboard-overview__title">Welcome back, {user.name}</h2>
      <BudgetOverview />
      <Transactions />
      <Goals />
    </section>
  );
};

export default DashboardOverview;
