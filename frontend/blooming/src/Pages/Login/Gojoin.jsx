import { NavLink } from "react-router-dom";
import Button from '../../components/Login/Button'

export default function Gojoin() {
  
  return (
    <NavLink style={{marginTop: '56px'}} to={"/join"} className='mainContainer'>
      <Button text="추가정보 입력하러 가기" />
    </NavLink>
  );
}
