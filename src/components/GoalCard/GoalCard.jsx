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
      className={`goals__card ${
        selectedGoal._id == goal._id ? "selected" : ""
      }`}
      onClick={handleClick}
    >
      <h3 className="goals__card-name">{goal.goalData.name}</h3>
      <p className="goals__card-description">{goal.goalData.description}</p>
      <p className="goals__card-due-date">
        Due: {new Date(goal.goalData.end_date).toLocaleDateString()}
      </p>
      <ProgressBar
        amount={goal.goalData.amount}
        currentAmount={goal.goalData.currentAmount}
      />
      <p className="goals__card-progress">
        ${goal.goalData.currentAmount} / ${goal.goalData.amount}
      </p>
      <button
        className="goals__card-edit-button"
        onClick={onEditClick}
      ></button>
    </li>
  );
}
export default GoalCard;
