import { useState } from "react";
import ErrorModal from "./ErrorModal";

const useErrorModal = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (message) => {
    setErrorMessage(message);
  };

  const handleCloseErrorModal = () => {
    setErrorMessage("");
  };

  const ErrorModal = () => (
    <ErrorModal errorMessage={errorMessage} onClose={handleCloseErrorModal} />
  );

  return [ErrorModal, handleError];
};

export default useErrorModal;
