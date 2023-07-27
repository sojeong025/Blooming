import { NavLink } from "react-router-dom";
import Button from "../../components/Login/Button";

export default function ChooseWedding() {
  
  return (
    <>
      <h3>[사용자이름]님의 결혼식 날짜는 언제인가요?</h3>
      <div>
        달력이 뜨세요
      </div>
      <NavLink to={"/Share"}>
        <Button text="다음" />
      </NavLink>
    </>
  )
}