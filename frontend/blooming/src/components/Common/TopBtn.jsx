import styled from "styled-components";

const TopBtn = ({ children, onClick }) => {
  return <CustomBtn onClick={onClick}>{children}</CustomBtn>;
};

const CustomBtn = styled.button`
  z-index: 950;
  color: black;
  border: none;
  background-color: transparent;

  display: flex;
  text-align: center;
  align-items: center;
  letter-spacing: 2px;
  margin: 0;
  padding: 0;

  height: 56px;

  position: fixed;
  top: 0;
  right: 0;
  margin-right: 16px;
`;

export default TopBtn;
