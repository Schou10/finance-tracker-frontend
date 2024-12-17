import React from "react";
import "./FeaturesOverview.css";
import icon1 from "../../assets/icon1.svg";
import icon2 from "../../assets/icon2.svg";
import icon3 from "../../assets/icon3.svg";

const FeaturesOverview = () => (
  <section className="features-overview">
    <h2 className="features-overview__title">Why Choose Us?</h2>
    <div className="feature-card">
      <img className="feature-card__img" src={icon1} alt="Track Spending" />
      <h3 className="feature-card__title">Track Spending</h3>
      <p className="feature-card__description">
        Monitor your daily expenses and see where your money goes.
      </p>
    </div>
    <div className="feature-card">
      <img className="feature-card__img" src={icon2} alt="Set Budgets" />
      <h3 className="feature-card__title">Set Budgets</h3>
      <p className="feature-card__description">
        Plan your monthly budget and stick to it effortlessly.
      </p>
    </div>
    <div className="feature-card">
      <img className="feature-card__img" src={icon3} alt="Analyze Trends" />
      <h3 className="feature-card__title">Analyze Trends</h3>
      <p className="feature-card__description">
        Visualize your spending habits with detailed charts and reports.
      </p>
    </div>
  </section>
);

export default FeaturesOverview;
