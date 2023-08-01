// 모달
import classes from "./Modal.module.css";

function Modal({ isOpen, children, closeModal }) {
  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div className={classes.back}></div>
      <div className={classes.modal}>
        <div>{children}</div>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
