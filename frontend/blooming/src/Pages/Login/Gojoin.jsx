gimport classes from "./Question.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Login/Button";

export default function Gojoin() {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "56px" }}>
      <div className={classes.div}>
        <div className={classes.container}>
          <h3>만나서 반갑습니다</h3>
          <h3>
            당신의 결혼을 도울 웨딩 플래너 <span>블루밍</span> 입니다.
          </h3>
        </div>
      </div>

      <h4>커플 코드를 받으셨나요?</h4>

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
  );
}
