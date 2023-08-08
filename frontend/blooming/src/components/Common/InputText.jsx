import classes from "./InputText.module.css";

const LabelInputComponent = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoFocus,
  required = false,
  readOnly = false,
  autoComplete = "off",
}) => {
  return (
    <div className={classes.container}>
      <input
        className={classes.inputField}
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        required={required}
        readOnly={readOnly}
        autoComplete={autoComplete}
      />
      <label className={classes.labelName} htmlFor={name}>
        <span className={classes.contentName}>{label}</span>
      </label>
    </div>
  );
};

export default LabelInputComponent;
