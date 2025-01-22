import { useContext } from "react";
import AppContext from "../../context/AppContext";

function GoalCard({ goal }) {
  const { handleEditGoalCLick } = useContext(AppContext);
  const onEditClick = () => handleEditGoalCLick(goal);
  return (
    <li key={goal._id} className="goal__card">
      <h3 className="goal__name">{goal.goalData.name}</h3>
      <p className="goal__description">{goal.goalData.description}</p>
      <p className="goal__due-date">
        Due: {new Date(goal.goalData.end_date).toLocaleDateString()}
      </p>
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{
            width: `${Math.min(
              (goal.goalData.currentAmount / goal.goalData.amount) * 100,
              100
            )}%`,
          }}
        ></div>
      </div>
      <p className="goal__progress">
        ${goal.goalData.currentAmount} / ${goal.goalData.amount}
      </p>

      <button className="goal__edit-button" onClick={onEditClick}></button>
    </li>
  );
}
export default GoalCard;
