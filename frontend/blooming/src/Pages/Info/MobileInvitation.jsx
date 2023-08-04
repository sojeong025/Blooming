import { NavLink } from "react-router-dom";
import { customAxios } from '../../lib/axios'
import { mobileInvitationState } from '../../recoil/MobileInvitationAtom';
import ConceptsList from "../../components/MobileInvitation/ConceptsList";
import { useEffect, useState } from "react";
import classes from './MobileInvitation.module.css'
import { useRecoilValue } from "recoil";

function MobileInvitation() {
  const mobileInvitationData = useRecoilValue(mobileInvitationState);
  const [count, setCount] = useState('')

  const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  };

  const fetchData = async () => {
    try {
      const response = await customAxios.get("invitation");
      setCount(response.count)
      console.log('가져오기 성공!')
      console.log(setCount)
    } catch (error) {
      console.error(error);
      console.log('가져오기 실패!')
      console.log(setCount)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='mainContainer'>
      <div className={classes.container}>
        <h1>Mobile Wedding Invitation</h1>
        <p>어디서나 간편하게 <br/>  완벽한 청첩장을 만들어보세요. <br/>우리의 모바일 청첩장 서비스로 손쉽게 결혼식 초대를 준비해보세요.</p>
        <hr />
        <ConceptsList />
        <hr />
        
        {count ? (
          <NavLink to="/MobileInvitationDetail">
            <button className={classes.btn}>나의 청첩장 보기</button>
          </NavLink>
        ) : (
          <NavLink to="/Create">
            <button className={classes.btn}>제작하기</button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default MobileInvitation;