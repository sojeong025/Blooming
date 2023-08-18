import styled, { keyframes } from "styled-components";

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner></Spinner>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #3f51b5;
  border-top-color: #3f51b5;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;
