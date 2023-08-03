import { NavLink } from "react-router-dom";
import Button from "../../components/Login/Button";
import { userState } from "../../recoil/ProfileAtom";
import { useRecoilValue } from "recoil";

export default function DecideWedding() {
  const userData = useRecoilValue(userState);

  return (
    <>
      <h3>{userData.name}님의 결혼식 날짜는 정해지셨나요?</h3>
      <NavLink to={"/ChooseWedding"}>
        <Button text='네, 정해졌습니다.' />
      </NavLink>

      <NavLink to={"/home"}>
        <Button text='아니요' />
      </NavLink>
    </>
  );
}
