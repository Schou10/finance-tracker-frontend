import { useContext } from "react";
import { GoalContext } from "../../context/GoalContext";
import "./Goals.css";

function Goals() {
  const { goals } = useContext(GoalContext);

  return (
    <section className="goals-section">
      <h2>Your Goals</h2>
      <ul className="goals__list">
        {goals.map((goal) => (
          <li key={goal._id} className="goal__card">
            <h3 className="goal__name">{goal.goalData.name}</h3>
            <p className="goal__description">{goal.goalData.description}</p>
            <p className="progress-bar"></p>
            <div
              className="progress-bar-fill"
              style={{
                width: `${Math.min(
                  (goal.goalData.currentAmount / goal.goalData.amount) * 100,
                  100
                )}%`,
              }}
            ></div>
            <p>
              {goal.goalData.currentAmount} / {goal.goalData.amount}
            </p>
            <p>Due: {new Date(goal.goalData.end_date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default Goals;
