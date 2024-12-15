import { useState, useEffect, useContext } from "react";
import AppContext from "../../context/AppContext.js";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, updateUser }) {
  const { currentUser: user } = useContext(CurrentUserContext) || {};
  const { isLoading } = useContext(AppContext);

  const [data, setData] = useState({ name: user.name, avatar: user.avatar });
  const [disable, setDisable] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(data);
  };

  // Checks Form input validity
  useEffect(() => {
    const isFormValid = Object.values(data).every(
      (value) => typeof value === "string" && value.trim() !== ""
    );
    setDisable(!isFormValid);
  }, [data]);

  // Sets user Data for the form
  useEffect(() => {
    if (isOpen === "edit-profile") {
      setData({ name: user.name, avatar: user.avatar });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      isOpen={isOpen == "edit-profile"}
      title="Change Profile Data"
      buttonText={isLoading ? "Saving Changes..." : "Save Changes"}
      onClose={onClose}
      onSubmit={handleSubmit}
      disable={disable}
    >
      <label htmlFor="edit-name" className="modal__label">
        <legend className="modal__legend">Name *</legend>
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          name="name"
          placeholder="Name"
          minLength={2}
          maxLength={40}
          required
          value={data.name}
          onChange={handleChange}
        />
        <span className={""} id="change-name-input-error"></span>
      </label>
      <label htmlFor="change-avatar" className="modal__label">
        <legend className="edit_legend">Avatar *</legend>
        <input
          type="url"
          className="modal__input"
          id="edit-avatar"
          name="avatar"
          placeholder="Avatar URL"
          minLength={2}
          maxLength={200}
          required
          value={data.avatar}
          onChange={handleChange}
        />
        <span className={""} id="change-avatar-input-error"></span>
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
