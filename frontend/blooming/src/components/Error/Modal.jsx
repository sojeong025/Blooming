// 모달
import classes from "./Modal.module.css";

function Modal({ show, children, buttonText, onClose }) {
  return (
    show && (
      <>
        <div className={classes.back}></div>
        <div className={classes.modal}>
          <div>{children}</div>
          <button onClick={onClose}>{buttonText}</button>
        </div>
      </>
    )
  );
}

export default Modal;
