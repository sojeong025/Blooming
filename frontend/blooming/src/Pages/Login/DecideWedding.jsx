import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Login/Button";
import { userState } from "../../recoil/ProfileAtom";
import { useRecoilValue } from "recoil";

export default function DecideWedding() {
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();

  return (
    <div className='mainContainer'>
      <h3>{userData.name}님의 결혼식 날짜는 정해지셨나요?</h3>

      <Button
        onClick={() => {
          navigate("/ChooseWedding", {
            state: { pageTitle: "회원가입" },
          });
        }}
        text='네, 정해졌습니다.'
      />

      <NavLink to={"/home"}>
        <Button text='아니요' />
      </NavLink>
    </div>
  );
}
