import styled from "styled-components";

const TopBtn = ({ text, onSubmit }) => {
  return <SubmitBtn onSubmit={onSubmit}>{text}</SubmitBtn>;
};

const SubmitBtn = styled.button`
  background-color: red;
  z-index: 999;
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 1.3rem;
  letter-spacing: 2px;

  height: 56px;

  position: fixed;
  top: 0;
  right: 0;
  margin-right: 16px;
`;

export default TopBtn;
