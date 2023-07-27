import { NavLink } from "react-router-dom";
import Button from "../../components/Login/Button";

export default function DecideWedding() {


  return (
    <>
      <h3>
        [사용자 이름 들어갈 곳]님의 결혼식 날짜는 정해지셨나요?
      </h3>
      <NavLink to={"/ChooseWedding"}>
        <Button text="네, 정해졌습니다." />
      </NavLink>
      <NavLink to={"/home"}>
        <Button text="아니요" />
      </NavLink>
    </>
  )
}