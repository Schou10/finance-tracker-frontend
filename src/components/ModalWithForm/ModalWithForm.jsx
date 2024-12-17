import "./ModalWithForm.css";
function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  disable,
  switchModal,
  switchText,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container">
        <button className="modal__close" onClick={onClose}></button>
        <h2 className="modal__heading">{title}</h2>
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
