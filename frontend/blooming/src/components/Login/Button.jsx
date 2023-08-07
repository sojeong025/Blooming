import PropTypes from "prop-types";
import { styled } from "styled-components";

const Button = ({ text, onClick }) => {
  return <CostomBtn onClick={onClick}>{text}</CostomBtn>;
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;

const CostomBtn = styled.button``;
