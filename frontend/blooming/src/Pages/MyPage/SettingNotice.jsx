import { useEffect, useState } from "react";
import classes from "./SettingNotice.module.css";
import { customAxios } from "../../lib/axios";

const SettingNotice = () => {
  const [checked, setChecked] = useState(true);
  const [isAgree, setIsAgree] = useState("");
  // 푸시알림 상태 조회
  const fetchNotification = async () => {
    try {
      const response = await customAxios.get("notification-setting");
      console.log(response.data.result[0].notificationSetting);
      setIsAgree(response.data.result[0].notificationSetting);
    } catch (error) {
      console.log("푸시알림 조회 에러", error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);

  // 푸시알림 변경하기
  const switchNotification = async () => {
    if (isAgree === "agree") {
      try {
        await customAxios.delete("notification-setting");
        setIsAgree("disagree");
      } catch (error) {
        console.log("푸시 delete", error);
      }
    } else if (isAgree === "disagree") {
      try {
        await customAxios.post("notification-setting");
        setIsAgree("agree");
      } catch (error) {
        console.log("푸시 post", error);
      }
    } else {
      console.log("why error");
    }
  };

  useEffect(() => {
    if (isAgree === "agree") {
      setChecked(true);
    } else if (isAgree === "disagree") {
      setChecked(false);
    }
  }, [isAgree]);

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
                  onChange={switchNotification}
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
