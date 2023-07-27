import Button from "../../components/Login/Button"
import { NavLink } from "react-router-dom"

export default function Question() {
  
  return (
    <>
      <h3>
        저희는 당신의 결혼을 함께 할 웨딩 플래너 <span>블루밍</span> 입니다.
      </h3>
      <h3>
        서비스 이용에 앞서 한 가지 질문을 드리겠습니다.
      </h3>
      <p>이미지</p>
      <NavLink to={"/DecideWedding"}>
        <Button text="시작하기" />
      </NavLink>
    </>
  )
}