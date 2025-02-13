import { useState, useEffect, useContext } from "react";
import AppContext from "../../context/AppContext.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { updateGoal, deleteGoal } from "../../utils/api.js";
import Notification from "../Notification/Notification.jsx";

function EditGoalModal({ isOpen }) {
  // Goal Data
  const {
    selectedGoal: goal,
    isLoading,
    closeActiveModal: onClose,
  } = useContext(AppContext);
  const [data, setData] = useState({
    name: "",
    description: "",
    end_date: "",
    amount: 0,
    currentAmount: 0,
  });
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateGoal({ goalId: goal.itemId }, data);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const isFormValid = Object.values(data).every((value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      }
      return value !== null && value !== undefined;
    });
    setDisable(!isFormValid);
  }, [data]);

  useEffect(() => {
    if (goal) {
      setData({
        name: goal.goalData.name,
        description: goal.goalData.description,
        end_date: goal.goalData.end_date,
        amount: goal.goalData.amount,
        currentAmount: goal.goalData.currentAmount,
      });
    }
  }, [goal]);

  return (
    <>
      {error && <Notification message={error} onClose={() => setError(null)} />}
      <ModalWithForm
        isOpen={isOpen == "edit-goal"}
        title="Edit Goal"
        buttonText={isLoading ? "Updating Goal..." : "Submit"}
        onSubmit={handleSubmit}
        disable={disable}
        switchText={""}
        onDelete={() => deleteGoal(goal._id)}
      >
        <label htmlFor="goal_name" className="modal__label">
          <legend className="modal__legend">Goal Name*</legend>
          <input
            type="text"
            className="modal__input"
            id="edit-goal_name"
            name="name"
            placeholder="Goal"
            required
            value={data.name}
            onChange={handleChange}
          />
          <span className={""} id="edit-goal-name-input-error"></span>
        </label>
        <label htmlFor="edit-goal_description" className="modal__label">
          <legend className="modal_legend">Goal Description*</legend>
          <textarea
            className="modal__input"
            id="edit-goal_description"
            name="description"
            placeholder="Goal Description"
            required
            value={data.description}
            onChange={handleChange}
            minLength={2}
            maxLength={150}
          />
          <span className={""} id="edit-goal-descryption-input-error"></span>
        </label>
        <label htmlFor="edit-goal_end_date" className="modal__label">
          <legend className="modal_legend">Date*</legend>
          <input
            type="date"
            className="modal__input"
            id="edit-end_date"
            name="end_date"
            required
            value={data.end_date}
            onChange={handleChange}
          />
          <span className={""} id="edit-goal-date-input-error"></span>
        </label>
        <label htmlFor="edit-goal_amount" className="modal__label">
          <legend className="modal_legend">Amount*</legend>
          <input
            type="number"
            className="modal__input"
            id="edit-goal_amount"
            name="amount"
            required
            value={data.amount}
            onChange={handleChange}
            min={0}
          />
          <span className={""} id="edit-goal-amount-input-error"></span>
        </label>
      </ModalWithForm>
    </>
  );
}

export default EditGoalModal;
