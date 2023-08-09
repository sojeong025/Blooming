import classes from "./Question.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Login/Button";
import StatusBar from "./StatusBar";

import InputForm from "../../components/Common/InputText";
import { useState } from "react";
import { userState } from "../../recoil/ProfileAtom";
import { useRecoilState } from "recoil";

export default function Gojoin() {
  const navigate = useNavigate();

  const [userData, setUserData] = useRecoilState(userState);
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    phoneNumber: "",
    gender: "",
  });

  const loginData = useState([
    { id: 1, title: "", name: "name" },
    { id: 2, title: "", name: "coupleCode" },
    { id: 3, title: "", name: "phoneNumber" },
    { id: 4, title: "", name: "gender" },
    { id: 5, title: "", name: "weddingDate" },
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={`'mainContainer' ${classes.goJoinContainer}`}>
      {/* <StatusBar
        currentStep={1}
        totalSteps={5}
        backgroundColor='white'
        progressColor={"red"}
      /> */}
      <div className={classes.titleText}>
        <p>만나서 반갑습니다</p>
        <p>
          당신의 결혼을 도울 웨딩 플래너 <span>블루밍</span>입니다
        </p>
      </div>
      <h1>---👷🏻‍♀️🚧개발중🚧👷🏻‍♂️🚬---</h1>
      {/* <div>커플 코드가 있어요</div>
        <CustomHr dataContent='OR' />
        <div>커플 코드 없이 계속하기</div> */}

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
  );
}
