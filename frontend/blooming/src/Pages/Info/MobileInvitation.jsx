import { NavLink } from "react-router-dom";
import { customAxios } from '../../lib/axios'
import ConceptsList from "../../components/MobileInvitation/ConceptsList";
import { useEffect, useState } from "react";

function MobileInvitation() {
  const [mobileInvitationData, setMobileInvitationData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await customAxios.get("invitation");

      console.log(response.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='mainContainer'>
      <h1>모바일 청첩장</h1>
      <p>심플하지만 임팩트 있는, 간편하게 제작하는 모바일청첩장</p>
      <hr />
      <ConceptsList>일단 여기는 컨셉 박스로 들어갈 거임</ConceptsList>
      <hr />
      
      {mobileInvitationData ? (
        <button>나의 청첩장 보기</button>
      ) : (
        <NavLink to="/Create">
          <button>제작하기</button>
        </NavLink>
      )}
    </div>
  );
};

export default MobileInvitation;