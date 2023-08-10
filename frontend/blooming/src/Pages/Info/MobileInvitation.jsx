import { NavLink } from "react-router-dom";
import { customAxios } from "../../lib/axios";
import { mobileInvitationState } from "../../recoil/MobileInvitationAtom";
import ConceptsList from "../../components/MobileInvitation/ConceptsList";
import { useEffect, useState } from "react";
import classes from "./MobileInvitation.module.css";
import { useRecoilState } from "recoil";

function MobileInvitation() {
  const [mobileInvitationData, setMobileInvitationData] = useRecoilState(mobileInvitationState);
  const [count, setCount ] = useState(0)

  const fetchData = async () => {
    try {
      const response = await customAxios.get("invitation");
      setCount(response.data.count)
      if (response.data.result[0]) {
        setMobileInvitationData(response.data.result[0])
      }
    } catch (error) {
      console.log(error);
      console.log("가져오기 실패!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className='mainContainer'>
      <div className={classes.container}>
        {/* <h1>Mobile Wedding Invitation</h1> */}
        <div className={classes.concept}>
          <ConceptsList />
        </div>

        {count ? (
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
