import { NavLink } from "react-router-dom";
import { customAxios } from "../../lib/axios";
import { mobileInvitationState } from "../../recoil/MobileInvitationAtom";
import ConceptsList from "../../components/MobileInvitation/ConceptsList";
import { useEffect, useState } from "react";
import classes from "./MobileInvitation.module.css";
import { useRecoilValue } from "recoil";

function MobileInvitation() {
  const mobileInvitationData = useRecoilValue(mobileInvitationState);
  const [count, setCount] = useState("");

  const fetchData = async () => {
    try {
      const response = await customAxios.get("invitation");
      setCount(response.data.count)
      console.log('가져오기 성공!')
      console.log('체크해보기', count)
      console.log('response.data.count 확인', response.data.count)
    } catch (error) {
      console.error(error);
      console.log("가져오기 실패!");
      console.log(setCount);
    }
  };

  useEffect(() => {
    fetchData();
  }, [count]);

  return (
    <div className='mainContainer'>
      <div className={classes.container}>
        <h1>Mobile Wedding Invitation</h1>
        <hr />
        <ConceptsList />
        <hr />

        {count === 0 ? (
          <NavLink to='/mobile-invitation-detail'>
            <button className={classes.btn}>나의 청첩장 보기</button>
          </NavLink>
        ) : (
          <NavLink to='/invitation-create'>
            <button className={classes.btn}>제작하기</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default MobileInvitation;
