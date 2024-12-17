import React, { useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import Transactions from "../Transactions/Transactions";
import BudgetOverview from "../BudgetOverview/BudgetOverview";
import Charts from "../Charts/Charts";

const DashboardOverview = () => {
  let { currentUser: user } = useContext(CurrentUserContext) || {};

  return (
    <section className="dashboard-overview">
      <h1 className="dashboard-overview__title">Welcome back, {user.name}</h1>
      <BudgetOverview />
      <Transactions />
      <Charts />
    </section>
  );
};

export default DashboardOverview;
