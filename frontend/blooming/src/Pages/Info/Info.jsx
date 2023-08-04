import { NavLink } from "react-router-dom";

function Info() {
  return (
    <div className='mainContainer'>
      <p>웨딩홀 | 스튜디오 | 드레스 | 메이크업 </p>
      <NavLink to="/mobileinvitation" state={{ pageTitle:"모바일청첩장"}}>
          <button>모바일청첩장</button>
      </NavLink>
    </div>
  )
}

export default Info