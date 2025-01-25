import { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import "./SaveModal.css";
import "../Modal/Modal.css";

function SaveModal({ selectedGoal, handleSave, isVisible }) {
  const [amount, setAmount] = useState("");
  const { closeActiveModal: onClose, activeModal } = useContext(AppContext);

  const handleSubmit = () => {
    handleSave(selectedGoal._id, amount);
  };

  return (
    <div
      className={`save-modal ${
        activeModal != "edit-goal" &&
        isVisible &&
        selectedGoal.goalData.name != ""
          ? "visible"
          : "hidden"
      }`}
    >
      <label>Save to {selectedGoal.goalData.name}:</label>
      <input
        className="save-modal__input"
        id="save-amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button className="save-modal__button" onClick={handleSubmit}>
        Submit
      </button>
      <button className="modal__close" onClick={() => onClose()}></button>
    </div>
  );
}
export default SaveModal;
