import { useContext } from "react";
import AppContext from "../../context/AppContext";
import "./ModalWithForm.css";
function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onSubmit,
  disable,
  switchModal,
  switchText,
  onDelete,
}) {
  const { closeActiveModal: onClose } = useContext(AppContext);
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button className="modal__close" onClick={onClose}></button>
        <h2 className="modal__heading">{title}</h2>
        {isOpen === "edit-goal" ? (
          <button className="modal__delete" onClick={() => onDelete}></button>
        ) : null}
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div>
            <button
              className={`modal__submit ${
                disable ? "modal__submit_disabled" : ""
              }`}
              type="submit"
              disabled={disable}
            >
              {buttonText}
            </button>
            {switchText ? (
              <button
                type="button"
                onClick={switchModal}
                className="modal__button"
              >
                or {switchText}
              </button>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
