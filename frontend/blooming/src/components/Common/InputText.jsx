import PropTypes from "prop-types";
import classes from "./InputText.module.css";

const LabelInputComponent = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  autoFocus,
  required = false,
  readOnly = false,
}) => {
  return (
    <div className='label-input'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        required={required}
        readOnly={readOnly}
      />
    </div>
  );
};

export default LabelInputComponent;
