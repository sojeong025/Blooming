import { customAxios } from "../../lib/axios";
import { useEffect, useState } from "react";

import classes from "./MyWishlist.module.css";

export default function MyWishlist() {

  const [state, setState] = useState('me')

  const fetchData = async () => {
    try {
      const response = await customAxios.get("wishlist");
      console.log(response.data.result[0])
    } catch (error) {
      console.error("예약 정보 조회 에러:", error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const handlerMeState = () => {
    setState('me');
  }

  const handlerYouState = () => {
    setState('you');
  }

  const handlerToState = () => {
    setState('together');
  }

  return (
    <div style={{marginTop: '56px'}}>
      <nav className={classes.navContainer}>
        <div onClick={handlerMeState}>내가 찜</div>
        <div onClick={handlerYouState}>약혼자 찜</div>
        <div onClick={handlerToState}>겹치는 찜</div>
      </nav>
      {(state === 'me') && <div>내꺼</div>}
      {(state === 'you') && <div>너꺼</div>}
      {(state === 'together') && <div>같아</div>}
    </div>
  );
}