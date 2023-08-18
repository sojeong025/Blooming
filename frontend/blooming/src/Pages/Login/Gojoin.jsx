import classes from "./Question.module.css";
import { useNavigate } from "react-router-dom";

export default function Gojoin() {
  const navigate = useNavigate();

  return (
    <div className={`'mainContainer' ${classes.goJoinContainer}`}>
      <div className={classes.titleText}>
        <p>만나서 반갑습니다</p>
        <p>
          당신의 결혼을 도울 웨딩 플래너 <br /> <span>블루밍</span>입니다
        </p>
      </div>
      <p className={classes.subTitle}> 상대방에게 연결 코드를 받으셨나요?</p>

      <div className={classes.buttonContainer}>
        <div
          className={classes.codeBtn}
          onClick={() =>
            navigate("/join", {
              state: { pageTitle: "회원가입" },
            })
          }
        >
          커플 코드가 있어요
        </div>
        <div
          className={classes.codeBtn}
          onClick={() =>
            navigate("/join", {
              state: { pageTitle: "회원가입", currentStep: 1 },
            })
          }
        >
          커플 코드 없이 계속하기
        </div>
      </div>
    </div>
  );
}
