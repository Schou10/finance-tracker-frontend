import { useState, useEffect, useContext } from "react";
import AppContext from "../../contexts/AppContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
function RegisterModal({ handleRegistration, isOpen, onClose, switchModal }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
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
    handleRegistration(data);
  };

  // Dissables the Form Submit Button
  useEffect(() => {
    const isFormValid = Object.values(data).every(
      (value) => value.trim() !== ""
    );
    setDisable(!isFormValid);
  }, [data]);

  return (
    <ModalWithForm
      isOpen={isOpen == "sign up"}
      title="Sign Up"
      buttonText={isLoading ? "Signing up..." : "Sign Up"}
      onClose={onClose}
      onSubmit={handleSubmit}
      disable={disable}
      switchModal={switchModal}
      switchText={"Log in"}
    >
      <label htmlFor="signup-email" className="modal__label">
        <legend className="modal__legend">Email*</legend>
        <input
          type="email"
          className="modal__input"
          id="signup-email"
          name="email"
          placeholder="Email"
          required
          value={data.email}
          onChange={handleChange}
        />
        <span className={""} id="signup-email-input-error"></span>
      </label>
      <label htmlFor="signup-password" className="modal__label">
        <legend className="modal_legend">Password*</legend>
        <input
          type="password"
          className="modal__input"
          id="signup-password"
          name="password"
          placeholder="Password"
          required
          value={data.password}
          onChange={handleChange}
        />
        <span className={""} id="signup-password-input-error"></span>
      </label>
      <label htmlFor="signup-name" className="modal__label">
        <legend className="modal__legend">Name*</legend>
        <input
          type="text"
          className="modal__input"
          id="signup-name"
          name="name"
          placeholder="Name"
          minLength={2}
          maxLength={40}
          required
          value={data.name}
          onChange={handleChange}
        />
        <span className={""} id="signup-name-input-error"></span>
      </label>
      <label htmlFor="signup-avatar" className="modal__label">
        <legend className="modal_legend">Avatar*</legend>
        <input
          type="url"
          className="modal__input"
          id="signup-avatar"
          name="avatar"
          placeholder="Avatar URL"
          minLength={2}
          maxLength={200}
          required
          value={data.avatar}
          onChange={handleChange}
        />
        <span className={""} id="signup-avatar-input-error"></span>
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
