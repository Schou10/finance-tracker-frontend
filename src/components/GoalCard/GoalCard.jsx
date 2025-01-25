import { useContext } from "react";
import AppContext from "../../context/AppContext";
import ProgressBar from "../ProgressBar/ProgressBar";

function GoalCard({ goal, onSaveClick }) {
  const { handleEditGoalClick, selectedGoal } = useContext(AppContext);
  const onEditClick = () => handleEditGoalClick(goal);
  const handleClick = () => onSaveClick(goal);
  return (
    <li
      key={goal._id}
      className={`goal__card ${selectedGoal._id == goal._id ? "selected" : ""}`}
      onClick={handleClick}
    >
      <h3 className="goal__name">{goal.goalData.name}</h3>
      <p className="goal__description">{goal.goalData.description}</p>
      <p className="goal__due-date">
        Due: {new Date(goal.goalData.end_date).toLocaleDateString()}
      </p>
      <ProgressBar
        amount={goal.goalData.amount}
        currentAmount={goal.goalData.currentAmount}
      />
      <p className="goal__progress">
        ${goal.goalData.currentAmount} / ${goal.goalData.amount}
      </p>
      <button className="goal__edit-button" onClick={onEditClick}></button>
    </li>
  );
}
export default GoalCard;
