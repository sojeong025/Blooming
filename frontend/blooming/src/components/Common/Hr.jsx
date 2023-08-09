import { styled } from "styled-components";

const HrComponent = ({ dataContent }) => {
  return (
    <>
      <CustomHr data-content={dataContent} />
    </>
  );
};

const CustomHr = styled.hr`
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  &:before {
    content: "";
    background: linear-gradient(to right, transparent, #818078, transparent);
    /* background: #666; */
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 1px;
  }
  &:after {
    content: attr(data-content);
    position: relative;
    display: inline-block;
    color: black;

    padding: 0 0.5em;
    line-height: 1.5em;
    color: #818078;
    background-color: var(--color-bg);
  }
`;

export default HrComponent;
