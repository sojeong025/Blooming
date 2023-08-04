import classes from "./Question.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Login/Button";
import { Space } from "antd";

export default function Gojoin() {
  const navigate = useNavigate();

  return (
    <div className='mainContainer'>
      <div className={classes.div}>
        <div className={classes.container}>
          <h2>만나서 반갑습니다</h2>
          <h2>
            당신의 결혼을 도울 웨딩 플래너 <span>블루밍</span> 입니다.
          </h2>

          <Space>
            <h2>커플 코드를 받으셨나요?</h2>
          </Space>
        </div>

        <div className={classes.btn}>
          <Button
            className={classes.btn}
            text='커플 코드가 있어요'
            onClick={() =>
              navigate("/join-code", {
                state: { pageTitle: "회원가입" },
              })
            }
          />
          <Button
            className={classes.btn}
            text='없어요'
            onClick={() =>
              navigate("/join", {
                state: { pageTitle: "회원가입" },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
