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
            "--total-steps": 5,
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
    width: calc((var(--current-step, 0) / var(--total-steps, 5)) * 100%);
    height: 5px;
    background-color: ${(props) =>
      props.activeBarColor || "var(--color-join-progress)"};
    border-radius: 5px;
    transition: width 0.5s;
  }
`;
const PrevButton = styled.button`
  position: absolute;
  top: 0px;
  left: 0px;
  margin-left: 16px;

  height: 60px;
  width: 60px;
  font-size: 17px;
  font-weight: bold;
  border: none;
  background-color: transparent;

  color: grey;
`;
