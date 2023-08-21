import styled, { keyframes } from "styled-components";

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Loader>
        <LoaderValue viewBox='0 0 24 24'>
          <circle cx='12' cy='12' r='10' />
        </LoaderValue>
      </Loader>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;

const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 250, 244, 0.5);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const loaderColors = ["var(--color-point)"];
const loaderDash = 63;
const loaderDuration = loaderColors.length * 1000 + "ms";
const loaderDurationAlt = parseInt(loaderDuration) / loaderColors.length + "ms";
const loaderKeyFrame = (1 / (loaderColors.length * 2)) * 100;

const loaderTurn = keyframes`
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(720deg);
  }
`;

const loaderStroke = keyframes`
  ${loaderKeyFrame}% {
    stroke-dashoffset: 0;
  }
  ${loaderKeyFrame * 2}%,
  100% {
    stroke-dashoffset: ${loaderDash};
  }
`;

const Loader = styled.div`
  animation: ${loaderTurn} ${loaderDurationAlt} linear infinite;
  max-width: 60px;
  padding: 1rem;
  width: 100%;
`;

const LoaderValue = styled.svg`
  animation: ${loaderStroke} ${loaderDuration} linear infinite;
  fill: none;
  stroke-dasharray: ${loaderDash};
  stroke-dashoffset: ${loaderDash};
  stroke-linecap: round;
  stroke-width: 4;

  &:nth-child(1) {
    stroke: ${loaderColors[0]};
  }
`;
