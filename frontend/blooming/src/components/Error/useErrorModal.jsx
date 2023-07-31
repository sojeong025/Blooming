import { useState } from "react";
import ErrorComponent from "./ErrorComponent";

const useErrorModal = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleError = (message) => {
    setErrorMessage(message);
  };

  const handleCloseErrorModal = () => {
    setErrorMessage("");
  };

  const ErrorModal = () => (
    <ErrorComponent
      errorMessage={errorMessage}
      onClose={handleCloseErrorModal}
    />
  );

  return [ErrorModal, handleError];
};

export default useErrorModal;
