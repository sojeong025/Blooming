import { useState } from "react";
import classes from "./GenderButton.module.css";

export const GenderButton = () => {
  const [inputValue, setInputValue] = useState("");

  // 상태 업데이트 함수
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div className={classes.GenderContainer}>
      <ul className={classes.radioSwitch}>
        <li className={classes.radioSwitchItem}>
          <input
            type='radio'
            className={`${classes.radioSwitch__input} ${classes.srOnly}`}
            id='radio1'
            name='radioSwitch'
            checked
            value='1'
            onClick={handleInputChange}
          />
          <label htmlFor='radio1' className={classes.radioSwitch__label}>
            Monthly
          </label>
        </li>

        <li className={classes.radioSwitchItem}>
          <input
            type='radio'
            className={`${classes.radioSwitch__input} ${classes.srOnly}`}
            id='radio2'
            name='radioSwitch'
            value='2'
            onClick={handleInputChange}
          />
          <label htmlFor='radio2' className={classes.radioSwitch__label}>
            Yearly
          </label>
          <div className={classes.radioSwitch__marker} aria-hidden='true'></div>
        </li>
      </ul>
    </div>
  );
};
