import PropTypes from "prop-types";
import classes from "./InputText.module.css";

const InputText = ({ id, label, value, required, disabled, autoFocus }) => {
  return (
    <div className={classes.container}>
      <label htmlFor={id} className={classes.inputLabel}>
        {label}
      </label>
      <input
        className={classes.inputField}
        type='text'
        id={id}
        value={value}
        required={required}
        disabled={disabled}
        autoFocus={autoFocus}
        placeholder=''
      />
    </div>
  );
};

// InputForm.propTypes = {
//   text: PropTypes.string.isRequired,
// };

export default InputText;
