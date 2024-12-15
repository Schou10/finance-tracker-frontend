import { useState, useEffect, useContext } from "react";
import AppContext from "../../context/AppContext.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
function GoalModal({ handleGoal, isOpen, onClose }) {
  // Goal Data
  const [data, setData] = useState({
    name: "",
    description: "",
    end_date: "",
  });
  const [disable, setDisable] = useState(true);
  const { isLoading } = useContext(AppContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGoal(data);
  };

  useEffect(() => {
    const isFormValid = Object.values(data).every(
      (value) => value.trim() !== ""
    );
    setDisable(!isFormValid);
  }, [data]);

  return (
    <ModalWithForm
      isOpen={isOpen == "goal"}
      title="New Goal"
      buttonText={isLoading ? "Adding Goal..." : "Submit"}
      onClose={onClose}
      onSubmit={handleSubmit}
      disable={disable}
      switchText={""}
    >
      <label htmlFor="goal_name" className="modal__label">
        <legend className="modal__legend">Email*</legend>
        <input
          type="text"
          className="modal__input"
          id="goal_name"
          name="name"
          placeholder="Goal"
          required
          value={data.name}
          onChange={handleChange}
        />
        <span className={""} id="goal-name-input-error"></span>
      </label>
      <label htmlFor="goal_description" className="modal__label">
        <legend className="modal_legend">Password*</legend>
        <textarea
          className="modal__input"
          id="goal_description"
          name="description"
          placeholder="Goal Description"
          required
          value={data.description}
          onChange={handleChange}
          minLength={2}
          maxLength={150}
        />
        <span className={""} id="goal-descryption-input-error"></span>
      </label>
      <label htmlFor="goal_date" className="modal__label">
        <legend className="modal_legend">Date*</legend>
        <textarea
          type="date"
          className="modal__input"
          id="goal_description"
          name="date"
          placeholder={new Date()}
          required
          value={data.date}
          onChange={handleChange}
        />
        <span className={""} id="goal-date-input-error"></span>
      </label>
    </ModalWithForm>
  );
}

export default GoalModal;
