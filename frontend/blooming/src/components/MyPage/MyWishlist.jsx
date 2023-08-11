import { customAxios } from "../../lib/axios";
import { useEffect, useState } from "react";

import classes from "./MyWishlist.module.css";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/ProfileAtom"

import MyWishlistMe from "./MyWishlistMe";

export default function MyWishlist() {

  const user = useRecoilValue(userState)
  const [state, setState] = useState('me')
  const [me, setMe] = useState()
  const [you, setYou] = useState()
  const [together, setTogether] = useState()

  const classify = (myWishlist) => {
    {myWishlist.map((wishlist) => {
      if (wishlist.username === user.name) {
        setMe([...me, wishlist])
        if (you.some((item) => item.productId === wishlist.productId)) {
          setTogether([...together, wishlist])
        }
      } else {
        setYou([...you, wishlist])
        if (me.some((item) => item.productId === wishlist.productId)) {
          setTogether([...together, wishlist])
        }
      }
    })}
  }

  const fetchData = async () => {
    try {
      const response = await customAxios.get("wishlist");
      if (response.status === 204) {
        return <div>찜한 정보가 없습니다.</div>
      } else {
        classify(response.data.result[0])
      }
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
      {(state === 'me') && <MyWishlistMe wishlist={me} /> }
      {(state === 'you') && <div>너꺼</div>}
      {(state === 'together') && <div>같아</div>}
    </div>
  );
}