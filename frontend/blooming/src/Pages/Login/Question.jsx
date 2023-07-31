import Button from "../../components/Login/Button"
import { NavLink } from "react-router-dom"
import classes from "./Question.module.css";


export default function Question() {
  
  return (
    <div className={classes.div}>
      <div className={classes.container}>
        <h3> 저희는 당신의 결혼을 함께 할 </h3>
        <h3> 웨딩 플래너 <span>블루밍</span> 입니다.</h3>
        <h3>
          서비스 이용에 앞서 한 가지 질문을 드리겠습니다.
        </h3>
      </div>
      <div className={classes.img}>
        <p>이미지</p>
      </div>
      <div className={classes.btn}>
        <NavLink to={"/DecideWedding"}>
          <Button text="시작하기" />
        </NavLink>
      </div>
    </div>
  )
}