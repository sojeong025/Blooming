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
        <div className={classes.concept}>
          <ConceptsList />
        </div>

        {count ? (
          <NavLink to='/mobile-invitation-detail'>
            <div className={classes.btn}>나의 청첩장 보기</div>
          </NavLink>
        ) : (
          <NavLink to='/invitation-create'>
            <div className={classes.btn}>제작하기</div>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default MobileInvitation;
