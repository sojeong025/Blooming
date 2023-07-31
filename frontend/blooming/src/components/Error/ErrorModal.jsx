// import classes from "./Modal.module.css";

const ErrorModal = ({ errorMessage, onClose }) => {
  if (!errorMessage) {
    return null;
  }
  return (
    <>
      <div className='modal'>
        <div className='modal-content'>
          <h2>Error</h2>
          <p>{errorMessage}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default ErrorModal;
