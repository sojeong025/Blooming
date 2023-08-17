import { customAxios } from "../../lib/axios";
import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/ProfileAtom";

import MyWishlistMe from "./MyWishlistMe";
import { styled } from "styled-components";

export default function MyWishlist() {
  const user = useRecoilValue(userState);
  const [state, setState] = useState("me");
  const [me, setMe] = useState([]);
  const [you, setYou] = useState([]);
  const [together, setTogether] = useState([]);
  const [selected, setSelected] = useState("me");
  const [duplicatedProducts, setDuplicatedProducts] = useState([]);

  const classify = (myWishlist) => {
    let newMe = [];
    let newYou = [];
    let newTogether = [];

    {
      myWishlist.map((wishlist) => {
        // console.log(wishlist, user.name);
        if (wishlist.userName === user.name) {
          newMe.push(wishlist);
          if (newYou.some((item) => item.productId === wishlist.productId)) {
            newTogether.push(wishlist);
          }
        } else {
          newYou.push(wishlist);
          if (newMe.some((item) => item.productId === wishlist.productId)) {
            newTogether.push(wishlist);
          }
        }
      });
    }
    setMe(newMe);
    setYou(newYou);
    setTogether(newTogether);
  };

  const findDuplicatedProducts = (wishList) => {
    const counts = {};
    let duplicatedItems = [];

    wishList.forEach((item) => {
      counts[item.productId] = counts[item.productId]
        ? {
            count: counts[item.productId].count + 1,
            items: [...counts[item.productId].items, item],
          }
        : {
            count: 1,
            items: [item],
          };
    });

    Object.entries(counts)
      .filter(([, { count }]) => count > 1)
      .forEach(([, { count, items }]) => {
        duplicatedItems = [...duplicatedItems, ...items];
      });

    setDuplicatedProducts(duplicatedItems);
  };

  const fetchData = async () => {
    try {
      const response = await customAxios.get("wishlist");
      if (response.status === 204) {
        return <div>찜한 정보가 없습니다.</div>;
      } else {
        classify(response.data.result[0]);
        findDuplicatedProducts(response.data.result[0]);
      }
    } catch (error) {
      console.error("예약 정보 조회 에러:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlerMeState = () => {
    setState("me");
    setSelected("me");
  };

  const handlerYouState = () => {
    setState("you");
    setSelected("you");
  };

  const handlerToState = () => {
    setState("together");
    setSelected("together");
  };

  return (
    <div style={{ marginTop: "56px" }}>
      <NavContainer>
        <NavItem onClick={handlerMeState} active={selected === "me"}>
          내가 찜
        </NavItem>
        <NavItem onClick={handlerToState} active={selected === "together"}>
          겹치는 찜
        </NavItem>
        <NavItem onClick={handlerYouState} active={selected === "you"}>
          약혼자 찜
        </NavItem>
      </NavContainer>

      {state === "me" && <MyWishlistMe myWishlist={me} toWishlist={me} />}
      {state === "you" && (
        <MyWishlistMe myWishlist={duplicatedProducts} toWishlist={you} />
      )}
      {state === "together" && <MyWishlistMe toWishlist={together} />}
    </div>
  );
}

const NavContainer = styled.nav`
  top: 56px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0px;
  width: 100%;
  height: 40px;
  position: fixed;
  z-index: 800;
`;

const NavItem = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #555;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 3px;
    background-color: var(--color-point);
    opacity: ${({ active }) => (active ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`;
