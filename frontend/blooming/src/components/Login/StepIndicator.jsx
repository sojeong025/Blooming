import styled from "styled-components";

const StepIndicator = ({
  currentStep,
  barColor,
  activeBarColor,
  onPrevClick,
}) => {
  return (
    <>
      <StepNav>
        {currentStep !== 0 && (
          <PrevButton onClick={onPrevClick}>이전</PrevButton>
        )}
      </StepNav>
      <Steps>
        <StepBar
          barColor={barColor}
          activeBarColor={activeBarColor}
          style={{
            "--current-step": currentStep || 0,
            "--total-steps": 6,
          }}
        />
      </Steps>
    </>
  );
};

export default StepIndicator;

const StepNav = styled.div`
  height: 60px;
`;

const Steps = styled.div`
  display: flex;
  flex-direction: column;
`;

const StepBar = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${(props) => props.barColor || "lightgray"};
  border-radius: 5px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: calc((var(--current-step, 0) / var(--total-steps, 6)) * 100%);
    height: 5px;
    background-color: ${(props) => props.activeBarColor || "blue"};
    border-radius: 5px;
    transition: width 0.5s;
  }
`;
const PrevButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
