import { useState } from "react";
import classes from "./SettingNotice.module.css";

const SettingNotice = () => {
  const [checked, setChecked] = useState(true);
  const toggleClick = () => {
    // 알림 켜고 끈 상태 저장하기
    setChecked(!checked);
  };

  return (
    <div className='mainContainer'>
      <div className={classes.wrapper}>
        <ul className={classes.settingList}>
          <li className={classes.settingItem}>
            <span>PUSH 알림</span>
            <div>
              <label className={classes.toggleControl}>
                <input
                  type='checkbox'
                  checked={checked}
                  onClick={toggleClick}
                />
                <span className={classes.control}></span>
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingNotice;
